import { useRef, useEffect } from 'react';

const useOutsideClick = <T extends HTMLElement>(callback: () => void) => {
  const targetRef = useRef<T>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const { target } = e;
      if (targetRef.current && !targetRef.current.contains(target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [callback]);

  return { targetRef };
};

export default useOutsideClick;
