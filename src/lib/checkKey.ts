import { PostCheckSessionId } from '@/app/api/mongoAPI';

const KEY_REGEX = /^[A-Za-z0-9]{3}-[A-Za-z0-9]{7}$/;

const getKey = (value: string) => {
  if (value.startsWith('http')) {
    return value.slice(value.length - 6);
  }
  return value;
};

const validateKey = (value: string) => {
  const key = getKey(value);
  const isValid = KEY_REGEX.test(key);

  if (isValid) {
    return value;
  }
  return false;
};

export const checkKey = async (value: string) => {
  const key = validateKey(value);
  if (!key) {
    return false;
  }
  const isValidKey = await PostCheckSessionId(value);
  if (!isValidKey) {
    return false;
  }
  return key;
};
