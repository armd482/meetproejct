'use client';

import Link from 'next/link';
import * as Icon from '@/asset/icon';
import { CurrentDate, IconButton } from './part/Header';
import { useUserInfoStore } from '@/store/UserInfoStore';
import { useState } from 'react';
import { useOutsideClick } from '@/hook';
import { useShallow } from 'zustand/react/shallow';

const ICON_PROPS = {
  width: 24,
  height: 24,
  fill: '#5f6368',
};

const BUTTON_LIST = [
  {
    name: '지원',
    icon: <Icon.Help {...ICON_PROPS} />,
  },
  {
    name: '문제 신고',
    icon: <Icon.Declaration {...ICON_PROPS} />,
  },
  {
    name: '설정',
    icon: <Icon.Setting {...ICON_PROPS} />,
  },
];

export default function Header() {
  const { name, color, setName, setColor, setId } = useUserInfoStore(
    useShallow((state) => ({
      name: state.name,
      color: state.color,
      setName: state.setName,
      setColor: state.setColor,
      setId: state.setId,
    })),
  );

  const [isClickedName, setIsClickedName] = useState(false);

  const handleCloseInfo = () => {
    setIsClickedName(false);
  };

  const handleLogout = () => {
    setName('');
    setColor('');
    setId('');
    setIsClickedName(false);
  };
  const { targetRef } = useOutsideClick<HTMLDivElement>(handleCloseInfo);

  return (
    <div className='relative h-16'>
      <Link
        href='/'
        className='absolute left-5 top-1/2 flex h-10 -translate-y-1/2 items-center gap-2 whitespace-nowrap'
      >
        <Icon.Logo width={36} height={36} />
        <p className='text-1.5xl font-semibold text-gray-600'>Project</p>
        <p className='text-1.5xl font-medium text-gray-600'>Meet</p>
      </Link>
      <div className='absolute right-5 top-1/2 z-10 flex -translate-y-1/2 items-center whitespace-nowrap bg-white'>
        <CurrentDate />
        {BUTTON_LIST.map((button) => (
          <IconButton key={button.name} name={button.name}>
            {button.icon}
          </IconButton>
        ))}
        {name && color && (
          <div className='relative'>
            <button
              type='button'
              className='size-8 rounded-full flex items-center justify-end truncate text-white font-bold mx-3'
              style={{ backgroundColor: color }}
              onClick={() => setIsClickedName((prev) => !prev)}
            >
              {name}
            </button>
            {isClickedName && (
              <div
                ref={targetRef}
                className='absolute flex items-center flex-col top-full right-0 -translate-x-3 translate-y-2 bg-[#E9EEF6] rounded-3xl  w-[412px] p-4 gap-3'
                style={{ boxShadow: '0 4px 8px 3px rgba(0, 0, 0, 0.15),0 1px 3px rgba(0, 0, 0, 0.3)' }}
              >
                <button
                  type='button'
                  onClick={handleCloseInfo}
                  className='flex absolute right-2 top-2 size-12 items-center justify-center'
                >
                  <Icon.Delete width={24} height={24} fill='#444746' />
                </button>

                <div className='text-sm mx-14 my-2 text-center font-medium truncate mb-4'>{name}</div>
                <div
                  className='flex w-[104px] h-[104px] rounded-full items-center justify-center text-white font-bold text-3xl  overflow-hidden'
                  style={{ backgroundColor: color }}
                >
                  {name}
                </div>
                <div className='text-center text-2xl font-medium text-wrap'>안녕하세요, {name}님.</div>
                <button
                  type='button'
                  onClick={handleLogout}
                  className='flex items-center justify-center bg-[#F8FAFD] w-full rounded-full py-4 gap-3 text-lg mt-2 text-[#1F1F1F]'
                >
                  <Icon.Logout width={18} height={18} fill='#444746' />
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
