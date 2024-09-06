'use client';

import { formatTime, formatDate } from '@/lib/formatDate';
import { useCurrentDate } from '@/hook';

export default function CurrentDate() {
  const time = useCurrentDate();
  return (
    <div className='flex items-center gap-2 p-3 text-lg font-medium text-gray-500 max-[472px]:hidden'>
      <p>{formatTime(time)}</p>
      <span>•</span>
      <p>{formatDate(time)}</p>
    </div>
  );
}
