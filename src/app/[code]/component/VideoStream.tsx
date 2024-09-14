'use client';

import { useEffect, useRef } from 'react';
import { Publisher, Subscriber } from 'openvidu-browser';
import { Visualizer } from '@/component';
import * as Icon from '@/asset/icon';
import { useDeviceStore } from '@/store/DeviceStore';

interface UserInfo extends Record<'id' | 'name' | 'color', string> {
  audio: boolean;
  video: boolean;
}

interface VideoStreamProps {
  user: UserInfo;
  subscriber: Subscriber | Publisher;
  muted?: boolean;
}

export default function VideoStream({ user, subscriber, muted = false }: VideoStreamProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioOutput = useDeviceStore((state) => state.audioOutput);

  useEffect(() => {
    if (subscriber && videoRef.current) {
      subscriber.addVideoElement(videoRef.current);
      videoRef.current.setSinkId(audioOutput.id);
    }
  }, [subscriber, audioOutput]);

  const stream = subscriber.stream.getMediaStream();

  return (
    <div className='relative flex w-full items-center'>
      <div className='relative z-10 aspect-video w-full overflow-hidden rounded-lg'>
        {!user.video && (
          <div className='absolute left-0 top-0 z-20 size-full bg-[#3C4043]'>
            <div
              className='absolute left-1/2 top-1/2 flex aspect-square h-2/5 -translate-x-1/2 -translate-y-1/2 items-center justify-center truncate rounded-full font-bold text-white'
              style={{ backgroundColor: user.color, fontSize: '150%' }}
            >
              {user.name}
            </div>
          </div>
        )}
        <div className='absolute right-2 top-2 z-30'>
          {user.audio ? (
            <Visualizer stream={stream} />
          ) : (
            <div className='flex size-[26px] items-center justify-center rounded-full bg-[#34373A]'>
              <Icon.MicOff width={18} height={18} fill='#ffffff' />
            </div>
          )}
        </div>
        <div className='absolute bottom-2 left-2 z-30 w-full truncate font-googleSans text-sm text-white'>
          {user.name}
        </div>
        <video ref={videoRef} autoPlay muted={muted} className='size-full bg-[#3C4043]' />
      </div>
    </div>
  );
}
