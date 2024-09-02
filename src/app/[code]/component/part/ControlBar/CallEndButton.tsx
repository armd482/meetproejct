'use client';

import { useRouter } from 'next/navigation';
import { CallEndIcon } from '@/asset';
import { ButtonTag } from '@/component';

export default function CallEndButton() {
  const router = useRouter();
  const handleButtonClick = () => {
    /* session leave */
    router.push('/landing');
  };
  return (
    <ButtonTag name='통화에서 나가기'>
      <button
        type='button'
        className='flex h-12 w-[72px] items-center justify-center rounded-full bg-[#DC362E] hover:bg-[#DE4442] active:bg-[#E25B59]'
        onClick={handleButtonClick}
      >
        <CallEndIcon width={24} height={24} fill='#ffffff' />
      </button>
    </ButtonTag>
  );
}