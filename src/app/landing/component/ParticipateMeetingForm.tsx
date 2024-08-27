'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeypadIcon } from '@/asset';
import { checkKey } from '@/lib/checkKey';

export default function ParticipateMeetingForm() {
  const router = useRouter();
  const [value, setValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = checkKey(value);
    if (result) {
      router.push(`/${result}`);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className='relative flex shrink items-center gap-2'
    >
      <KeypadIcon
        className='absolute left-4 top-1/2 -translate-y-2/4'
        width={22}
        height={16}
        fill='#5F6368'
      />
      <input
        className='max-w-[246px] shrink rounded-[4px] border border-solid border-[#80868B] py-[11px] pl-12 pr-4 text-[16px] text-[#3C4043] outline-[#1B77E4]'
        placeholder='코드 또는 링크 입력'
        value={value}
        onChange={handleInputChange}
      />
      <button
        type='submit'
        className={`shrink-0 rounded-[4px] px-4 py-3 text-[16px] ${value ? 'text-[#1A73E8]' : 'text-[#B5B6B7]'} ${value && 'hover:bg-[#F6FAFE]'}`}
        disabled={!value}
      >
        참여
      </button>
    </form>
  );
}