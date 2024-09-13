'use client';

import { usePathname } from 'next/navigation';
import { useCurrentDate } from '@/hook';
import { formatTime } from '@/lib/formatDate';

export default function MeetInfoBar() {
  const code = usePathname().slice(1);
  const date = useCurrentDate();

  return (
    <div className='flex flex-1 items-center gap-3 truncate'>
      <p>{formatTime(date)}</p>
      <div className='h-4 border-r border-solid border-white' />
      <p className='truncate'>{code}</p>
    </div>
  );
}
