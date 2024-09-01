'use client';

import { usePathname } from 'next/navigation';
import { useCurrentDate } from '@/hook/useCurrentDate';
import { formatTime } from '@/lib/formatDate';

export default function MeetInfoBar() {
  const code = usePathname().slice(1);
  const date = useCurrentDate();

  return (
    <div className='absolute left-5 top-1/2 flex -translate-y-1/2 items-center gap-3'>
      <p>{formatTime(date)}</p>
      <div className='h-4 border-r border-solid border-white' />
      <p>{code}</p>
    </div>
  );
}
