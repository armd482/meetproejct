import { useCallback, useEffect, useState } from 'react';
import {
  OpenVidu,
  Session as OVSession,
  Publisher,
  Subscriber,
} from 'openvidu-browser';
import { postCreateSession, postToken } from '@/app/api/sessionAPI';

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

  const joinSession = async (sid: string, name: string) => {
    const token = await postToken(sid);
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    setOV(newOV);

    const newSession = newOV.initSession();
    await newSession.connect(token, { clientData: name });
    setSession(newSession);
    const newPublisher = newOV.initPublisher(undefined, {
      audioSource: true,
      videoSource: true,
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
        data.push([
          entry.connectionId,
          newSession.subscribe(entry.stream, undefined),
        ]);
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

  const createSession = async (sid: string, name: string) => {
    const id = await postCreateSession(sid);
    console.log(id);
    await joinSession(id, name);
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
    session.on('streamCreated', (e) => {
      const { connectionId, data } = e.stream.connection;
      setParticipants((prev) => ({
        ...prev,
        [connectionId]: JSON.parse(data).clientData,
      }));
      const newSubscribe = session.subscribe(e.stream, undefined);
      setSubscribers((prev) => [...prev, [connectionId, newSubscribe]]);
    });

    session.on('streamDestroyed', (e) => {
      const { connectionId } = e.stream.connection;
      setParticipants((prev) => {
        const newParticipants = { ...prev };
        delete newParticipants[connectionId];
        return newParticipants;
      });
      setSubscribers((prev) =>
        prev.filter((entity) => entity[0] !== connectionId),
      );
    });
  }, [session]);

  return {
    user,
    publisher,
    subscribers,
    session,
    participants,
    OV,
    createSession,
    joinSession,
    leaveSession,
  };
};

export default useOpenvidu;
