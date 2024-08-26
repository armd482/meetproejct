'use client';

import useOpenvidu from '@/hook/useOpenvidu';

export default function Home() {
  const { session, participants, createSession, joinSession, leaveSession } =
    useOpenvidu();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {!session ? (
        <div>
          <button
            type='button'
            onClick={() =>
              createSession('test', new Date().getTime().toString())
            }
          >
            생성하기
          </button>
          <button
            type='button'
            onClick={() => joinSession('test', new Date().getTime().toString())}
          >
            참가하기
          </button>
        </div>
      ) : (
        <div>
          <button type='button' onClick={() => leaveSession()}>
            나가기
          </button>
          {Object.entries(participants).map((el) => (
            <div key={el[0]}>{`id: ${el[0]}, name: ${el[1]}`}</div>
          ))}
        </div>
      )}
    </main>
  );
}
