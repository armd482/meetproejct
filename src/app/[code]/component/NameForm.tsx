'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { postCheckSessionId } from '@/app/api/mongoAPI';
import { getRandomHexColor } from '@/lib/getRandomColor';
import { createSession } from '@/lib/createSession';
import { useUserInfoStore } from '@/store/UserInfoStore';
import { Alert, Loading } from '@/component';

interface NameFormProps {
  isHost: boolean;
}

const MAX_SIZE = 60;

export default function NameForm({ isHost }: NameFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [name, setName] = useState('');
  const [isFailed, setIsFailed] = useState(false);
  const { setName: setUserName, setColor: setUserColor } = useUserInfoStore(
    useShallow((state) => ({
      setName: state.setName,
      setColor: state.setColor,
    })),
  );
  const sessionId = usePathname().slice(1);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_SIZE);
    setName(value);
  };

  const handleFromSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      return;
    }

    setIsPending(true);

    const randomColor = getRandomHexColor();

    if (isHost) {
      const key = await createSession(3);
      if (key) {
        setUserName(name);
        setUserColor(randomColor);
        router.push(`${key}`);
      } else {
        setIsPending(false);
        setIsFailed(true);
        return;
      }
    }

    if (!isHost) {
      const isValidSessionId = await postCheckSessionId(sessionId);
      if (!isValidSessionId) {
        alert('이미 닫힌 회의방입니다.');
        router.push('/');
        return;
      }
      setUserName(name);
      setUserColor(randomColor);
    }
  };

  const handleAlertClose = () => {
    setIsFailed(false);
  };
  return (
    <form className='flex w-full max-w-[300px] flex-col items-center justify-center' onSubmit={handleFromSubmit}>
      <div className='w-full pb-[5px] pt-5 font-googleSans'>
        <input
          value={name}
          onChange={handleInputChange}
          placeholder='이름'
          className='h-14 w-full rounded border border-solid border-custom-gray px-4 text-base outline-none'
        />
        <p className='w-full px-4 pt-1 text-right text-xs text-[#444746]'>{`${name.length} / ${MAX_SIZE}`}</p>
      </div>
      <button
        type='submit'
        className={`mt-4 h-14 w-60 rounded-full  ${name.length ? 'bg-[#0B57D0] text-white' : 'bg-[#E4E4E4] text-[#999999]'} text-center`}
        disabled={name.length === 0}
      >
        {isHost ? '생성하기' : '참여하기'}
      </button>
      <Loading isPending={isPending} />
      <Alert isOpen={isFailed} onCloseAlert={handleAlertClose} text='세션 생성에 실패하였습니다' />
    </form>
  );
}
