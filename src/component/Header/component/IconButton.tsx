'use client';

import { ReactNode, useState } from 'react';

interface IconButtonProps {
  children: ReactNode;
  name: string;
}

export default function IconButton({ children, name }: IconButtonProps) {
  const [isDrag, setIsDrag] = useState(false);

  const handleButtonMouseEnter = () => {
    setIsDrag(true);
  };

  const handleButtonMouseLeave = () => {
    setIsDrag(false);
  };
  return (
    <div className='relative'>
      <button
        type='button'
        className='rounded-full p-3 transition duration-200 ease-in-out hover:bg-gray-100'
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleButtonMouseLeave}
      >
        {children}
      </button>
      {isDrag && (
        <div className='absolute -bottom-7 left-1/2 flex h-6 w-max -translate-x-2/4 items-center rounded-md bg-black px-2 text-xs text-white opacity-75'>
          {name}
        </div>
      )}
    </div>
  );
}
