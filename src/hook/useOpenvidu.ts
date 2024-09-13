import { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { OpenVidu, Session as OVSession, Publisher, StreamEvent, Subscriber } from 'openvidu-browser';
import { postToken } from '@/app/api/sessionAPI';
import { useDeviceStore } from '@/store/DeviceStore';
import { useRouter } from 'next/navigation';
import useCheckPermission from './useCheckPermission';
import useCurrentDevice from './useCurrentDevice';
import { getDevicePermission } from '@/lib/getDevicePermission';
import useDevice from './useDevice';

const UNPUBLISH = new Set(['unpublish', 'forceUnpublishByUser', 'forceUnpublishByServer']);

const useOpenvidu = (sessionId: string, name: string) => {
  const router = useRouter();
  const { updateDevice } = useCurrentDevice();

  const [isInitial, setIsInitial] = useState(true);
  const [session, setSession] = useState<OVSession | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<[string, Subscriber][]>([]);
  const [participants, setParticipants] = useState<Record<string, string>>({});
  const [user, setUser] = useState<Record<'id' | 'name', null | string>>({
    id: null,
    name: null,
  });

  const [OV, setOV] = useState<OpenVidu | null>(null);

  const { permission, audioInput, videoInput, setDeviceEnable, setPermission } = useDeviceStore(
    useShallow((state) => ({
      audioInput: state.audioInput,
      videoInput: state.videoInput,
      permission: state.permission,
      setDeviceEnable: state.setDeviceEnable,
      setPermission: state.setPermission,
    })),
  );

  const { stream, handleUpdateStream } = useDevice();

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }
    setOV(null);
    setSession(null);
    setParticipants({});
    setPublisher(null);
    setSubscribers([]);
  }, [session]);

  const joinSession = useCallback(async () => {
    try {
      const token = await postToken(sessionId);
      const newOV = new OpenVidu();
      newOV.enableProdMode();
      setOV(newOV);
      const newSession = newOV.initSession();
      await newSession.connect(token, { clientData: name });
      setSession(newSession);
      const newPublisher = newOV.initPublisher(undefined, {
        audioSource: !permission || (permission && permission.audio) ? (audioInput.id ?? true) : false,
        videoSource: !permission || (permission && permission.video) ? (videoInput.id ?? true) : false,
        publishAudio: true,
        publishVideo: true,
      });
      await newSession.publish(newPublisher);
      setPublisher(newPublisher);
      setSubscribers(() => {
        const data: [string, Subscriber][] = [];
        newSession.remoteConnections.forEach((entry) => {
          if (!entry.stream) {
            return;
          }
          data.push([entry.connectionId, newSession.subscribe(entry.stream, undefined)]);
        });
        return data;
      });

      setParticipants(() => {
        const totalParticipants = {};
        newSession.remoteConnections.forEach((entry) => {
          const { connectionId, data } = entry;
          Object.assign(totalParticipants, {
            [connectionId]: JSON.parse(data).clientData,
          });
        });
        return totalParticipants;
      });

      const {
        connection: { connectionId, data },
      } = newSession;
      setUser({ id: connectionId, name: JSON.parse(data).clientData });
    } catch {
      alert('이미 닫힌 회의실입니다');
      leaveSession();
      router.push('/landing');
    }
  }, [name, sessionId, audioInput, videoInput, permission, router, leaveSession]);

  const changeDevice = useCallback(
    async (type: 'audio' | 'video', value: boolean | string) => {
      if (!publisher || !session) {
        return;
      }

      if (typeof value === 'boolean') {
        setDeviceEnable((prev) => ({ ...prev, [type === 'audio' ? 'audio' : 'video']: value }));
        if (type === 'audio') {
          await publisher.publishAudio(value);
          return;
        }
        await publisher.publishVideo(value);
        return;
      }

      const newPermission = await getDevicePermission();
      setPermission(newPermission);
      setDeviceEnable((prev) => ({
        audio: prev.audio && newPermission.audio,
        video: prev.video && newPermission.video,
      }));

      if (type === 'audio') {
        if (!newPermission.audio) {
          return;
        }
        const newStream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: value } });
        const track = newStream.getAudioTracks()[0];
        await publisher.replaceTrack(track);
        return newStream;
      }
      const newStream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: value } });
      const track = newStream.getVideoTracks()[0];
      await publisher.replaceTrack(track);
      return newStream;
    },
    [publisher, setPermission, setDeviceEnable],
  );

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);
    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

  useEffect(() => {
    const initialJoinSession = async () => {
      if (isInitial) {
        setIsInitial(false);
        const newPermission = await getDevicePermission();
        setPermission(newPermission);
        setDeviceEnable((prev) => ({
          audio: prev.audio && newPermission.audio,
          video: prev.video && newPermission.video,
        }));
        await joinSession();
      }
    };

    initialJoinSession();
  }, [joinSession, isInitial, permission, setPermission, setDeviceEnable]);

  useEffect(() => {
    if (!session) {
      return;
    }
    const handleCreateStream = (e: StreamEvent) => {
      const { connectionId, data } = e.stream.connection;

      if (connectionId === user.id) {
        return;
      }

      setParticipants((prev) => ({
        ...prev,
        [connectionId]: JSON.parse(data).clientData,
      }));
      const newSubscribe = session.subscribe(e.stream, undefined);
      setSubscribers((prev) => [
        ...prev.filter((subscriber) => subscriber[0] !== connectionId),
        [connectionId, newSubscribe],
      ]);
    };

    const handleDestroyStream = (e: StreamEvent) => {
      const isDisconnected = !UNPUBLISH.has(e.reason);
      const { connectionId } = e.stream.connection;

      if (isDisconnected) {
        setParticipants((prev) => {
          const newParticipants = { ...prev };
          delete newParticipants[connectionId];
          return newParticipants;
        });
        setSubscribers((prev) => prev.filter((subscriber) => subscriber[0] !== connectionId));
      }
    };

    session.on('streamCreated', handleCreateStream);
    session.on('streamDestroyed', handleDestroyStream);

    return () => {
      session.off('streamCreated', handleCreateStream);
      session.off('streamDestroyed', handleDestroyStream);
    };
  }, [session, user]);

  return {
    user,
    publisher,
    subscribers,
    session,
    participants,
    OV,
    stream,
    leaveSession,
    changeDevice,
    handleUpdateStream,
  };
};

export default useOpenvidu;
