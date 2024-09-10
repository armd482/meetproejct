'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { getParticipant, PostSessionId } from '@/app/api/mongoAPI';
import { getRandomId } from '@/lib/getRandomId';

export default function Page() {
  const [value, setValue] = useState('');
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const submitButton = async () => {
    await PostSessionId(value);
  };
  useEffect(() => {
    const getData = async () => {
      const data = await getParticipant('test');
      console.log(data);
    };
    getData();
    console.log(getRandomId(3));
  }, []);
  return (
    <div>
      <input value={value} onChange={handleValueChange} className='border border-solid border-gray-600' />
      <button type='button' onClick={submitButton} className='border border-solid border-black'>
        제출
      </button>
    </div>
  );
}
