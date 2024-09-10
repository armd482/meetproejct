import { ParticipantDataType } from '@/type/participantType';

export const PostSessionId = async (sessionId: string) => {
  const response = await fetch('/api/sessionId', {
    method: 'POST',
    body: JSON.stringify({ sessionId }),
  });
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }
};

export const DeleteSessionId = async (sessionId: string) => {
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

export const PostParticipant = async (sessionId: string, userName: string) => {
  const response = await fetch('/api/participant', {
    method: 'POST',
    body: JSON.stringify({ sessionId, userName }),
  });
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }
};
