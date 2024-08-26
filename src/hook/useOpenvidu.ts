import { useCallback, useEffect, useState } from 'react';
import {
  OpenVidu,
  Session as OVSession,
  Publisher,
  Subscriber,
} from 'openvidu-browser';
import { postCreateSession, postToken } from '@/api/sessionAPI';

const useOpenvidu = () => {
  const [session, setSession] = useState<OVSession | null>(null);
  /* subscribers, publisher 임시 state => db에 관리 */
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);

  const joinSession = async (sid: string, isPublisher?: true) => {
    const token = await postToken(sid);
    const newOV = new OpenVidu();
    setOV(newOV);

    const newSession = newOV.initSession();
    await newSession.connect(token);
    setSession(newSession);

    if (isPublisher) {
      const newPublisher = newOV.initPublisher(undefined, {
        audioSource: true,
        videoSource: true,
        publishAudio: true,
        publishVideo: true,
      });
      await newSession.publish(newPublisher);
      setPublisher(newPublisher);
    }
  };

  const createSession = async (sid: string) => {
    const id = await postCreateSession(sid);
    await joinSession(id, true);
  };

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }
    setOV(null);
    setSession(null);
    setSubscribers([]);
    setPublisher(null);
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
      const subscriber = session.subscribe(e.stream, undefined);
      setSubscribers((prev) => [...prev, subscriber]);
    });
  }, [session]);

  return {
    session,
    subscribers,
    publisher,
    OV,
    createSession,
    joinSession,
    leaveSession,
  };
};

export default useOpenvidu;
