import { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { OpenVidu, Session as OVSession, Publisher, StreamEvent, Subscriber } from 'openvidu-browser';
import { postToken } from '@/app/api/sessionAPI';
import { useDeviceStore } from '@/store/DeviceStore';

const UNPUBLISH = new Set(['unpublish', 'forceUnpublishByUser', 'forceUnpublishByServer']);

const useOpenvidu = () => {
  const [session, setSession] = useState<OVSession | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<[string, Subscriber][]>([]);
  const [participants, setParticipants] = useState<Record<string, string>>({});
  const [user, setUser] = useState<Record<'id' | 'name', null | string>>({
    id: null,
    name: null,
  });
  const [OV, setOV] = useState<OpenVidu | null>(null);

  const { audioInput, videoInput } = useDeviceStore(
    useShallow((state) => ({
      audioInput: state.audioInput,
      videoInput: state.videoInput,
    })),
  );

  const joinSession = async (sid: string, name: string) => {
    const token = await postToken(sid);
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    setOV(newOV);

    const newSession = newOV.initSession();
    await newSession.connect(token, { clientData: name });
    setSession(newSession);
    const newPublisher = newOV.initPublisher(undefined, {
      audioSource: audioInput.id ?? false,
      videoSource: videoInput.id ?? false,
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
  };

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

  const changeDevice = async (type: 'audio' | 'video', value: boolean | string) => {
    if (!publisher) {
      return;
    }

    const constraint = typeof value === 'string' ? { deviceId: value } : value;

    if (type === 'audio') {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: constraint });
      const track = stream.getAudioTracks()[0];
      publisher.replaceTrack(track);
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ video: constraint });
    const track = stream.getVideoTracks()[0];
    publisher.replaceTrack(track);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);
    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

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

      if (connectionId === user.id) {
        return;
      }

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
    joinSession,
    leaveSession,
    changeDevice,
  };
};

export default useOpenvidu;
