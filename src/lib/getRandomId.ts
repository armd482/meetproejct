import { BASE_60_DIGIT } from '@/asset/constant/id';

export const getRandomId = (length = 3): string => {
  const value = BASE_60_DIGIT[Math.floor(Math.random() * 60)];
  if (length === 1) {
    return value;
  }
  return value + getRandomId(length - 1);
};
