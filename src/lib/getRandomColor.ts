const getRandomValue = (start: number, end: number) => {
  return Math.floor(Math.random() * (end - start) + start);
};

export const getRandomHexColor = () => {
  const HEX = '0123456789abcdef';
  const rr = `${HEX[getRandomValue(0, 15)]}${HEX[getRandomValue(0, 15)]}`;
  const gg = `${HEX[getRandomValue(0, 15)]}${HEX[getRandomValue(0, 15)]}`;
  const bb = `${HEX[getRandomValue(0, 15)]}${HEX[getRandomValue(0, 15)]}`;
  return `#${rr}${gg}${bb}`;
};
