const formatNumber = (number: number) => {
  return number.toString().padStart(2, '0');
};

export const formatTime = (date: Date | string) => {
  const newDate = new Date(date);

  if (!newDate.getTime()) {
    return '시간 오류';
  }
  const hour = newDate.getHours();
  const period = hour < 12 ? '오전' : '오후';
  const hour12 = formatNumber(hour % 12 || 12);
  const minute = formatNumber(newDate.getMinutes());

  return `${period} ${hour12}:${minute}`;
};

export const formatDate = (date: Date | string) => {
  const newDate = new Date(date);
  if (!newDate.getTime()) {
    return '날짜 오류';
  }
  const WEEK = ['일', '월', '화', '수', '목', '금', '토'];
  const month = formatNumber(newDate.getMonth() + 1);
  const day = formatNumber(newDate.getDate());
  const week = WEEK[newDate.getDay()];

  return `${month}월 ${day}일 (${week})`;
};
