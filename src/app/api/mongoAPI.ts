import { ParticipantDataType } from '@/type/participantType';

export const PostSessionId = async (sessionId: string, origin?: string) => {
  const url = origin ? `${origin}/api/sessionId` : '/api/sessionId';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ sessionId }),
  });
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }
};

export const DeleteSessionId = async (sessionId: string, origin?: string) => {
  const url = origin ? `${origin}/api/sessionId?sessionId=${sessionId}` : `/api/sessionId?sessionId=${sessionId}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }
};

export const getParticipant = async (sessionId: string, origin?: string): Promise<ParticipantDataType[]> => {
  const url = origin ? `${origin}/api/participant?sessionId=${sessionId}` : `/api/participant?sessionId=${sessionId}`;
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
  });
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }
  const { data } = await response.json();
  return data;
};

export const PostParticipant = async (sessionId: string, userName: string, origin?: string) => {
  const url = origin ? `${origin}/api/participant` : '/api/participant';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ sessionId, userName }),
  });
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }
};

export const PostCheckSessionId = async (sessionId: string, origin?: string) => {
  const url = origin
    ? `${origin}/api/sessionId/check?sessionId=${sessionId}`
    : `/api/sessionId/check?sessionId=${sessionId}`;
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
  });
  const result = await response.json();
  return result.data;
};
