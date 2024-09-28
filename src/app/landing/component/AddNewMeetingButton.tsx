'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import * as Icon from '@/asset/icon';
import { Alert, Loading } from '@/component';
import { useUserInfoStore } from '@/store/UserInfoStore';
import { useShallow } from 'zustand/react/shallow';
import { createSession } from '@/lib/createSession';

export default function AddNewMeetingButton() {
  const router = useRouter();
  const { name, color } = useUserInfoStore(
    useShallow((state) => ({
      name: state.name,
      color: state.color,
    })),
  );
  const [isFailed, setIsFailed] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleButtonClick = async () => {
    if (!name || !color) {
      router.push('/user');
      return;
    }

    setIsPending(true);

    const key = await createSession(3);

    if (key) {
      router.push(`/${key}`);
      return;
    }
    setIsFailed(true);
    setIsPending(false);
  };

  const handleCloseAlert = () => {
    setIsFailed(false);
  };

  return (
    <>
      <button
        type='button'
        onClick={handleButtonClick}
        disabled={isPending}
        className='flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-[#1a73E8] px-[14px] text-base text-white hover:bg-[#1A6DDE] hover:shadow-md'
      >
        <Icon.AddMeeting width={18} height={18} fill='#ffffff' />새 회의
      </button>
      <Alert text='세션 생성에 실패하였습니다.' isOpen={isFailed} onCloseAlert={handleCloseAlert} />
      <Loading isPending={isPending} />
    </>
  );
}
