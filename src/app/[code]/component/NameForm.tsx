'use client';

import { usePathname, useRouter } from 'next/navigation';
import { PostCheckSessionId } from '@/app/api/mongoAPI';
import { UserInfoContext } from '@/context/userInfoContext';

import { ChangeEvent, FormEvent, useContext, useState } from 'react';

const MAX_SIZE = 60;

export default function NameForm() {
  const [name, setName] = useState('');
  const { handleNameChange } = useContext(UserInfoContext);
  const sessionId = usePathname().slice(1);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_SIZE);
    setName(value);
  };

  const handleFromSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    const isValidSessionId = await PostCheckSessionId(sessionId);
    if (!isValidSessionId) {
      alert('이미 닫힌 회의방입니다.');
      router.push('/');
      return;
    }

    handleNameChange(name);
  };
  return (
    <form className='flex flex-col items-center justify-center' onSubmit={handleFromSubmit}>
      <div className='pb-[5px] pt-5 font-googleSans'>
        <input
          value={name}
          onChange={handleInputChange}
          placeholder='이름'
          className='h-14 w-[300px] rounded-[4px] border border-solid border-[#1F1F1F] px-4 text-base outline-none'
        />
        <p className='w-[300px] px-4 pt-1 text-right text-xs text-[#444746]'>{`${name.length} / ${MAX_SIZE}`}</p>
      </div>
      <button
        type='submit'
        className={`mt-4 h-14 w-60 rounded-full  ${name.length ? 'bg-[#0B57D0] text-white' : 'bg-[#E4E4E4] text-[#999999]'} text-center`}
        disabled={name.length === 0}
      >
        참여 요청
      </button>
    </form>
  );
}
