const formatNumber = (number: number) => {
  return number.toString().padStart(2, '0');
};

export const formatTime = (date: Date) => {
  const hour = date.getHours();
  const period = hour < 12 ? '오전' : '오후';
  const hour12 = formatNumber(hour % 12 || 12);
  const minute = formatNumber(date.getMinutes());

  return `${period} ${hour12}:${minute}`;
};

export const formatDate = (date: Date) => {
  const WEEK = ['일', '월', '화', '수', '목', '금', '토'];
  const month = formatNumber(date.getMonth() + 1);
  const day = formatNumber(date.getDate());
  const week = WEEK[date.getDay()];

  return `${month}월 ${day}일 (${week})`;
};
