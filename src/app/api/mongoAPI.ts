import { ParticipantDataType } from '@/type/participantType';

export const postSessionId = async (sessionId: string) => {
  const response = await fetch('/api/sessionId', {
    method: 'POST',
    body: JSON.stringify({ sessionId }),
  });
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }
};

export const deleteSessionId = async (sessionId: string) => {
  const response = await fetch(`/api/sessionId?sessionId=${sessionId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }
};

export const getParticipant = async (sessionId: string): Promise<ParticipantDataType[]> => {
  const response = await fetch(`/api/participant?sessionId=${sessionId}`, {
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

export const postParticipant = async (sessionId: string, userId: string, userName: string, color: string) => {
  const response = await fetch('/api/participant', {
    method: 'POST',
    body: JSON.stringify({ sessionId, userId, userName, color }),
  });
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }
};

export const deleteParticipant = async (sessionId: string, userId: string) => {
  const response = await fetch('/api/participant', {
    method: 'DELETE',
    body: JSON.stringify({ sessionId, userId }),
  });
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }
};

export const postCheckSessionId = async (sessionId: string) => {
  const response = await fetch(`/api/sessionId/check?sessionId=${sessionId}`, {
    method: 'POST',
    cache: 'no-cache',
  });
  const result = await response.json();
  return result.data;
};
