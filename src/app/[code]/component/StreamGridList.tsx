'use client';

import { useState, useEffect } from 'react';
import { Publisher, Subscriber } from 'openvidu-browser';
import { useShallow } from 'zustand/react/shallow';

import { useUserInfoStore } from '@/store/UserInfoStore';
import { useDeviceStore } from '@/store/DeviceStore';
import { UserInfo } from '@/type/sessionType';
import { VideoStream, OtherAudioStream } from './part/Stream';

interface StreamGridListProps {
  subscribers: [string, Subscriber][];
  publisher: Publisher | null;
  participants: Record<string, UserInfo>;
}

export default function StreamGridList({ subscribers, publisher, participants }: StreamGridListProps) {
  const [maxRow, setMaxRow] = useState(Math.floor((window.innerWidth - 400) / 166));

  const { id, name, color } = useUserInfoStore(
    useShallow((state) => ({
      id: state.id,
      name: state.name,
      color: state.color,
    })),
  );

  const { deviceEnable } = useDeviceStore(
    useShallow((state) => ({
      deviceEnable: state.deviceEnable,
    })),
  );

  const maxNum = maxRow <= 1 ? 1 : maxRow === 2 ? 4 : maxRow * (maxRow - 1);
  const currentPageSubscribers = maxNum === 1 ? [] : subscribers.slice(0, maxNum - 2);
  const otherSubscriber = maxNum === 1 ? subscribers : subscribers.slice(maxNum - 2);

  useEffect(() => {
    const handleMaxNumUpdate = () => {
      const row = Math.max(Math.floor((window.innerWidth - 400) / 166), 2);
      setMaxRow(row);
    };
    window.addEventListener('resize', handleMaxNumUpdate);

    return () => {
      window.removeEventListener('resize', handleMaxNumUpdate);
    };
  }, []);

  return (
    <div
      className='relative grid size-full gap-4 border border-solid border-black'
      style={{
        gridTemplateColumns: `repeat(${currentPageSubscribers.length === 0 ? '1' : currentPageSubscribers.length + 1 < maxRow ? currentPageSubscribers.length + 1 : maxRow}, 1fr)`,
      }}
    >
      {publisher && <VideoStream user={{ id, name, color, ...deviceEnable }} subscriber={publisher} muted />}
      {currentPageSubscribers.map((entity) => (
        <VideoStream key={entity[0]} user={{ id: entity[0], ...participants[entity[0]] }} subscriber={entity[1]} />
      ))}
      {subscribers.length >= maxNum - 1 &&
        (otherSubscriber.length === 1 ? (
          <VideoStream
            user={{ id: otherSubscriber[0][0], ...participants[otherSubscriber[0][0]] }}
            subscriber={otherSubscriber[0][1]}
          />
        ) : (
          <OtherAudioStream
            otherSubscriber={otherSubscriber}
            name={participants[otherSubscriber[0][0]].name}
            color={participants[otherSubscriber[0][0]].color}
          />
        ))}
    </div>
  );
}
