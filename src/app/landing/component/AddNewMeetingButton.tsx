'use client';

import { useRouter } from 'next/navigation';
import { AddMeetingIcon } from '@/asset';
import { getNewKey } from '@/lib/getNewKey';

export default function AddNewMeetingButton() {
  const router = useRouter();

  const handleButtonClick = async () => {
    const key = await getNewKey();
    if (key) {
      router.push(`/${key}`);
    }
  };

  return (
    <button
      type='button'
      onClick={handleButtonClick}
      className='flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-[#1a73E8] px-[14px] text-base text-white hover:bg-[#1A6DDE] hover:shadow-md'
    >
      <AddMeetingIcon width={18} height={18} />새 회의
    </button>
  );
}
