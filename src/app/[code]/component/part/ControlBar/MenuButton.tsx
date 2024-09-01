'use client';

import { MenuIcon } from '@/asset';
import { ButtonTag } from '@/component';
import { useState } from 'react';

export default function MenuButton() {
  const [isClickedButton, setIsClickedButton] = useState(false);

  const handleButtonClick = () => {
    setIsClickedButton((prev) => !prev);
  };
  return (
    <div className='relative'>
      <ButtonTag name='옵션 더보기'>
        <button
          type='button'
          onClick={handleButtonClick}
          className='flex h-12 w-9 items-center justify-center rounded-full bg-[#393B3D] hover:bg-[#414345] active:bg-[#585A5C]'
        >
          <MenuIcon
            width={18}
            height={18}
            fill='#E3E3E3'
            className='rotate-90'
          />
        </button>
      </ButtonTag>
      {isClickedButton && (
        <div className='absolute -top-4 left-0 h-52 w-[324px] -translate-y-full bg-[#191D23]'>
          test
        </div>
      )}
    </div>
  );
}
