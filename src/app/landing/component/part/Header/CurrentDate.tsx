'use client';

import { formatTime, formatDate } from '@/lib/formatDate';
import { useCurrentDate } from '@/hook';

export default function CurrentDate() {
  const time = useCurrentDate();
  return (
    <div className='max-[472px]:hidden flex items-center gap-2 p-3 text-lg font-medium text-gray-500'>
      <p>{formatTime(time)}</p>
      <span>•</span>
      <p>{formatDate(time)}</p>
    </div>
  );
}
