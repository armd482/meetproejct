import { useState, useEffect, useRef } from 'react';

export const useCurrentDate = () => {
  const [time, setTime] = useState(new Date());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currnetSecond = new Date().getSeconds();
    const updateToken = () => {
      setTime(new Date());
    };
    timerRef.current = setTimeout(() => {
      timerRef.current = setTimeout(updateToken, 60000);
    }, 60 - currnetSecond);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return time;
};
