'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { getSessionId } from '@/lib/getRandomId';
import { postSessionId, deleteSessionId } from '@/app/api/mongoAPI';
import { postCreateSession } from '@/app/api/sessionAPI';
import * as Icon from '@/asset/icon';
import { Alert } from '@/component';

export default function AddNewMeetingButton() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const responseSessionId = async (count: number) => {
    if (count === 0) {
      setIsFailed(true);
      return null;
    }
    try {
      const key = getSessionId();
      await postSessionId(key);
      return key;
    } catch (error) {
      return responseSessionId(count - 1);
    }
  };

  const handleButtonClick = async () => {
    setIsClicked(true);
    const key = await responseSessionId(3);
    if (key) {
      try {
        await postCreateSession(key);
        router.push(`/${key}`);
      } catch {
        await deleteSessionId(key);
        setIsFailed(true);
      }
    }
    setIsClicked(false);
  };

  const handleCloseAlert = () => {
    setIsFailed(false);
  };

  return (
    <>
      <button
        type='button'
        onClick={handleButtonClick}
        disabled={isClicked}
        className='flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-[#1a73E8] px-[14px] text-base text-white hover:bg-[#1A6DDE] hover:shadow-md'
      >
        <Icon.AddMeeting width={18} height={18} fill='#ffffff' />새 회의
      </button>
      <Alert text='세션 생성에 실패하였습니다.' isOpen={isFailed} onCloseAlert={handleCloseAlert} />
    </>
  );
}
