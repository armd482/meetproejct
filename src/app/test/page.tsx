'use client';

import { useOpenvidu } from '@/hook';
import { useRef, useEffect } from 'react';

export default function Page() {
  const { session, publisher, subscribers, participants, createSession, joinSession, leaveSession } = useOpenvidu();
  const videoRef = useRef<HTMLVideoElement>(null);
  const subscriberRef = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (publisher && videoRef.current) {
      publisher.addVideoElement(videoRef.current);
    }
  }, [publisher]);

  useEffect(() => {
    subscriberRef.current = subscriberRef.current.slice(0, subscribers.length);
    if (subscribers.length !== 0) {
      subscribers.forEach((entity, i) => {
        if (subscriberRef.current[i]) {
          entity[1].addVideoElement(subscriberRef.current[i]);
        }
      });
    }
  }, [subscribers]);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {!session ? (
        <div>
          <button type='button' onClick={() => createSession('test', new Date().getTime().toString())}>
            생성하기
          </button>
          <button type='button' onClick={() => joinSession('test', new Date().getTime().toString())}>
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
          <video autoPlay ref={videoRef} />
          <div>
            {subscribers.map((entity, i) => (
              <video
                key={entity[0]}
                autoPlay
                ref={(el) => {
                  subscriberRef.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
