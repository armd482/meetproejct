import { CreateSessionDataType, ConnectSessionType } from '@/type/sessionType';

const SERVER_URL = 'http://localhost:4443';
const SERVER_SECRET = 'MY_SECRET';

export const postCreateSession = async (sessionId: string) => {
  const response = await fetch(`${SERVER_URL}/openvidu/api/sessions`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      Authorization: `Basic ${btoa(`OPENVIDUAPP:${SERVER_SECRET}`)}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customSessionId: sessionId }),
  });

  if (response.status === 409) {
    return sessionId;
  }

  if (!response.ok) {
    throw new Error('Session 생성 오류');
  }

  const result: CreateSessionDataType = await response.json();
  return result.id;
};

export const postToken = async (sessionId: string, name: string, color: string) => {
  const response = await fetch(`${SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      Authorization: `Basic ${btoa(`OPENVIDUAPP:${SERVER_SECRET}`)}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
  });

  if (!response.ok) {
    throw new Error();
  }

  const result: ConnectSessionType = await response.json();
  return result.token;
};
