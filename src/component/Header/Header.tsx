'use client';

import Link from 'next/link';
import { LogoIcon, DeclarationIcon, HelpIcon, SettingIcon } from '@/asset';
import { CurrentDate, IconButton } from './component';

export default function Header() {
  return (
    <div className='flex h-16 items-center justify-between px-5 py-2'>
      <Link href='/' className='flex h-10 items-center gap-2'>
        <LogoIcon width={36} height={36} />
        <p className='text-1.5xl font-semibold text-gray-600'>Project</p>
        <p className='text-1.5xl font-medium text-gray-600'>Meet</p>
      </Link>
      <div className='flex items-center'>
        <CurrentDate />
        <IconButton name='지원'>
          <HelpIcon width={24} height={24} fill='#5f6368' />
        </IconButton>
        <IconButton name='문제 신고'>
          <DeclarationIcon width={24} height={24} fill='#5f6368' />
        </IconButton>
        <IconButton name='설정'>
          <SettingIcon width={24} height={24} />
        </IconButton>
      </div>
    </div>
  );
}
