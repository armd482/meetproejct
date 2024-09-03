'use client';

import { useState, useRef } from 'react';
import * as Icon from '@/asset/icon';

export default function InfoPanel() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isClickedClipboardButton, setIsClickedClipboardButton] =
    useState(false);
  const handleClipboardButtonClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsClickedClipboardButton(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsClickedClipboardButton(false);
      timerRef.current = null;
    }, 3000);
  };

  return (
    <div
      style={{ height: 'calc(100% - 64px)' }}
      className='w-full overflow-auto font-googleSans text-[14px]'
    >
      <div className='px-6'>
        <p className='my-2 pt-2  font-medium text-black-87 '>참여 정보</p>
        <p className=' select-text text-[#5f5368]'>{window.location.href}</p>
      </div>
      <button
        type='button'
        onClick={handleClipboardButtonClick}
        className='mx-4 my-1 flex h-10 items-center gap-2 rounded-full px-3 py-px hover:bg-[#ECF2FC] active:bg-[#D5E2F8]'
      >
        <Icon.Clipboard width={18} height={18} fill='#0B57D0' />
        <p className='font-medium text-[#0B57D0]'>참여 정보 복사</p>
      </button>
      <div className='my-[7px] h-0 w-full border-t border-solid border-[#DADCE0]' />
      <div className='mb-[90px] px-6 py-4 text-[#5F6368] '>
        Project Calendar 첨부파일이 여기에 표시됩니다.
      </div>
      {isClickedClipboardButton && (
        <div
          className='fixed bottom-28 left-6 z-[2101] h-12 w-[312px] rounded bg-[#3C4043] px-4 py-[14px] text-[#E8EAED]'
          style={{
            boxShadow:
              'rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px',
          }}
        >
          회의 링크 복사됨
        </div>
      )}
    </div>
  );
}
