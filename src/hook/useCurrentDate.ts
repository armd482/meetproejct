'use client';

import { useState, useEffect, useRef } from 'react';

const useCurrentDate = () => {
  const [time, setTime] = useState<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currenTime = new Date();
    setTime(currenTime);

    const updateTime = () => {
      setTime(new Date());
    };

    timerRef.current = setTimeout(
      () => {
        updateTime();
        intervalRef.current = setInterval(updateTime, 60000);
      },
      60000 - (currenTime.getTime() % 60000),
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
