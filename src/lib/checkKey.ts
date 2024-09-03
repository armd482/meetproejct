const KEY_REGEX = /^[A-Za-z]{3}-[A-Za-z]{4}$/;

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

export const checkKey = (value: string) => {
  const key = validateKey(value);
  if (!key) {
    return false;
  }
  /* key check api */
  const result = true;
  if (!result) {
    return false;
  }
  return key;
};
