'use client';

import Link from 'next/link';
import * as Icon from '@/asset/icon';
import { useUserInfoStore } from '@/store/UserInfoStore';
import { useState } from 'react';
import { useOutsideClick } from '@/hook';
import { useShallow } from 'zustand/react/shallow';
import { CurrentDate, IconButton } from './part/Header';

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
              className='mx-3 flex size-8 items-center justify-end truncate rounded-full font-bold text-white'
              style={{ backgroundColor: color }}
              onClick={() => setIsClickedName((prev) => !prev)}
            >
              {name}
            </button>
            {isClickedName && (
              <div
                ref={targetRef}
                className='absolute right-0 top-full flex w-[412px] -translate-x-3 translate-y-2 flex-col items-center gap-3  rounded-3xl bg-[#E9EEF6] p-4'
                style={{ boxShadow: '0 4px 8px 3px rgba(0, 0, 0, 0.15),0 1px 3px rgba(0, 0, 0, 0.3)' }}
              >
                <button
                  type='button'
                  onClick={handleCloseInfo}
                  className='absolute right-2 top-2 flex size-12 items-center justify-center'
                >
                  <Icon.Delete width={24} height={24} fill='#444746' />
                </button>

                <div className='mx-14 my-2 mb-4 truncate text-center text-sm font-medium'>{name}</div>
                <div
                  className='flex size-[104px] items-center justify-center overflow-hidden rounded-full text-3xl font-bold text-white'
                  style={{ backgroundColor: color }}
                >
                  {name.slice(0, 3)}
                </div>
                <div className='text-wrap text-center text-2xl font-medium'>안녕하세요, {name}님.</div>
                <button
                  type='button'
                  onClick={handleLogout}
                  className='mt-2 flex w-full items-center justify-center gap-3 rounded-full bg-[#F8FAFD] py-4 text-lg text-[#1F1F1F]'
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
