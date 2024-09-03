import { postCreateSession } from '@/app/api/sessionAPI';

export const getNewKey = async () => {
  try {
    /* get new key api */
    const key = 'abc-defg';
    const id = await postCreateSession(key);
    return id;
  } catch {
    return false;
  }
};
