import { BASE_60_DIGIT } from '@/asset/constant/id';

export const getBase60 = (value: number): string => {
  if (value < 60) {
    return BASE_60_DIGIT[value];
  }
  return getBase60(Math.floor(value / 60)) + BASE_60_DIGIT[value % 60];
};
