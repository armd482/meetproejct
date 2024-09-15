export const timeDifferenceInMinutes = (date1: string, date2: string) => {
  const firstDate = new Date(date1).getTime();
  const secondDate = new Date(date2).getTime();

  return Math.abs(firstDate - secondDate) / (1000 * 60);
};
