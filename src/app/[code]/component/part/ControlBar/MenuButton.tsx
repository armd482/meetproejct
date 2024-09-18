'use client';

import { useState } from 'react';
import * as Icon from '@/asset/icon';
import { ButtonTag } from '@/component';
import MenuCard from './MenuCard';

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
          <Icon.Menu width={18} height={18} fill='#E3E3E3' className='rotate-90' />
        </button>
      </ButtonTag>
      {isClickedButton && (
        <div className='absolute -top-4 left-0 h-52 w-[324px] -translate-y-full rounded-xl bg-[#1E1F20] py-2'>
          <MenuCard icon={<Icon.FullScreen width={24} height={24} fill='#C4C7C5' />} name='전체화면' />
          <MenuCard icon={<Icon.FullScreen width={24} height={24} fill='#C4C7C5' />} name='전체화면' />
          <MenuCard icon={<Icon.FullScreen width={24} height={24} fill='#C4C7C5' />} name='전체화면' />
          <MenuCard icon={<Icon.FullScreen width={24} height={24} fill='#C4C7C5' />} name='전체화면' />
        </div>
      )}
    </div>
  );
}
