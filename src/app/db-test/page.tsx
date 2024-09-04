'use client';

import { ChangeEvent, useState } from 'react';

export default function Page() {
  const [value, setValue] = useState('');
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const submitButton = async () => {
    try {
      const res = await fetch('/api/mongoDB', {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify({ value }),
      });
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        value={value}
        onChange={handleValueChange}
        className='border border-solid border-gray-600'
      />
      <button
        type='button'
        onClick={submitButton}
        className='border border-solid border-black'
      >
        제출
      </button>
    </div>
  );
}
