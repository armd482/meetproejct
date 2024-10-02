'use client';

import { useState, useEffect, useRef } from 'react';

const useCurrentDate = () => {
  const [time, setTime] = useState(() => new Date());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currnetSecond = new Date().getTime();

    const updateTime = () => {
      setTime(new Date());
    };

    timerRef.current = setTimeout(
      () => {
        updateTime();
        intervalRef.current = setInterval(updateTime, 60000);
      },
      60000 - (currnetSecond % 60000),
    );

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return time;
};

export default useCurrentDate;
