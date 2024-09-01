'use client';

import { CSSProperties, ReactNode, useRef, useState } from 'react';

interface ButtonTagProps {
  children: ReactNode;
  name: string;
  position?: 'top' | 'bottom';
  gap?: number;
  style?: CSSProperties | null;
  align?: 'left' | 'center' | 'right';
}

export default function ButtonTag({
  children,
  name,
  position = 'top',
  gap = 4,
  style,
  align = 'center',
}: ButtonTagProps) {
  const [isDrag, setIsDrag] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const positionStyle =
    position === 'top'
      ? { top: `calc(-50% - ${gap}px)` }
      : { bottom: `calc(-50% - ${gap}px)` };

  const handleButtonMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsDrag(true);
      timerRef.current = null;
    }, 500);
  };

  const handleButtonMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsDrag(false);
  };
  return (
    <div
      className='relative size-fit'
      onMouseEnter={handleButtonMouseEnter}
      onMouseLeave={handleButtonMouseLeave}
    >
      {children}
      {isDrag && (
        <div
          className={`absolute flex h-6 w-max ${align === 'left' ? 'left-0' : align === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'} items-center rounded-md bg-black-75 px-2 text-xs text-white`}
          style={{ ...positionStyle, ...style }}
        >
          {name}
        </div>
      )}
    </div>
  );
}
