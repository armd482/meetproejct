'use client';

import * as Icon from '@/asset/icon';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function ChatPanel() {
  const [chat, setChat] = useState('');

  const handleInputChage = (e: ChangeEvent<HTMLInputElement>) => {
    setChat(e.target.value);
  };

  const handleFormSubmt = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className='flex flex-col flex-1'>
      <div className='m-3 p-3 rounded bg-[#F1F3F4] text-xs text-[#202124] text-center'>
        메시지는 고정되어 있지 않는 한, 메시지를 전송하면 통화 중인 사람에게만 표시됩니다. 통화가 끝나면 모든 메시지가
        삭제됩니다.
      </div>
      <div className='pb-2 flex-1 w-full'>
        <div></div>
      </div>
      <form className='relative flex items-center m-[15px] rounded-[25px] py-1 bg-[#F1F3F4]' onSubmit={handleFormSubmt}>
        <input
          className='flex-1 px-4 h-10 bg-transparent outline-none'
          placeholder='메세지 보내기'
          onChange={handleInputChage}
          value={chat}
        />
        <button type='submit' className='flex size-10 items-center justify-center'>
          <Icon.Submit width={24} height={24} fill='#ACAFB0' />
        </button>
      </form>
    </div>
  );
}
