'use client';

import { useEffect, useRef } from 'react';
import { Publisher, Subscriber } from 'openvidu-browser';
import { Visualizer } from '@/component';
import * as Icon from '@/asset/icon';
import { useDeviceStore } from '@/store/DeviceStore';

interface UserInfo {
  name: string;
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

  console.log(audioOutput.id);

  useEffect(() => {
    if (subscriber && videoRef.current) {
      subscriber.addVideoElement(videoRef.current);
      videoRef.current.setSinkId(audioOutput.id);
    }
  }, [subscriber, audioOutput]);

  const stream = subscriber.stream.getMediaStream();

  return (
    <div className='relative flex size-full items-center'>
      <div className='relative aspect-video w-full overflow-hidden rounded-lg z-10'>
        {!user.video && (
          <div className='absolute left-0 top-0 size-full bg-[#3C4043]'>
            <div className='absolute left-1/2 top-1/2 aspect-square h-2/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700' />
          </div>
        )}
        <div className='absolute right-2 top-2 z-10'>
          {user.audio ? (
            <Visualizer stream={stream} />
          ) : (
            <div className='flex items-center justify-center size-[26px] rounded-full bg-[#34373A]'>
              <Icon.MicOff width={18} height={18} fill='#ffffff' />
            </div>
          )}
        </div>
        <div className='absolute bottom-2 left-2 w-full truncate font-googleSans text-sm text-white z-10'>
          {user.name}
        </div>
        <video ref={videoRef} autoPlay muted={muted} className='size-full bg-[#3C4043]' />
      </div>
    </div>
  );
}
