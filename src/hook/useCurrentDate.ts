import { useState, useEffect, useRef } from 'react';

const useCurrentDate = () => {
  const [time, setTime] = useState(new Date());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currnetSecond = new Date().getTime();
    const updateTime = () => {
      setTime(new Date());
      timerRef.current = setTimeout(updateTime, 60000);
    };
    timerRef.current = setTimeout(
      () => {
        updateTime();
      },
      60000 - (currnetSecond % 60000),
    );

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return time;
};

export default useCurrentDate;
