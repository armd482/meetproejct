'use client';

import Link from 'next/link';
import { LogoIcon, DeclarationIcon, HelpIcon, SettingIcon } from '@/asset';
import { CurrentDate, IconButton } from './part/Header';

const ICON_PROPS = {
  width: 24,
  height: 24,
  fill: '#5f6368',
};

const BUTTON_LIST = [
  {
    name: '지원',
    icon: <HelpIcon {...ICON_PROPS} />,
  },
  {
    name: '문제 신고',
    icon: <DeclarationIcon {...ICON_PROPS} />,
  },
  {
    name: '설정',
    icon: <SettingIcon {...ICON_PROPS} />,
  },
];

export default function Header() {
  return (
    <div className='relative h-16'>
      <Link
        href='/'
        className='absolute left-5 top-1/2 flex h-10 -translate-y-1/2 items-center gap-2 whitespace-nowrap'
      >
        <LogoIcon width={36} height={36} />
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
      </div>
    </div>
  );
}
