export const getBase60 = (value: number): string => {
  const DIGITS =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  if (value < 60) {
    return DIGITS[value];
  }
  return getBase60(Math.floor(value / 60)) + DIGITS[value % 60];
};
