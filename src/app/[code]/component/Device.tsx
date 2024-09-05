'use client';

import { useDevice } from '@/hook/useDevice';
import { useDeviceStore } from '@/store/DeviceStore';
import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function Device() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isVideoEnable, setIsVideoEnable] = useState(true);

  const {
    streamRef,
    videoInputList,
    audioOutputList,
    audioInputList,
    handleAudioInputChange,
    handleAudioOutputChange,
    handleVideoInputChange,
    toggleVideoInput,
  } = useDevice();

  useEffect(() => {
    if (streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  });

  console.log(videoInputList);
  console.log(audioOutputList);
  console.log(audioInputList);

  const handleVideoButton = () => {
    setIsVideoEnable((prev) => {
      toggleVideoInput(!prev);
      return !prev;
    });
  };

  return (
    <div className='p-4 pr-2 pb-0 w-full'>
      <div
        className='relative aspect-video w-full max-w-[764px] overflow-hidden rounded-lg mb-4'
        style={{
          boxShadow:
            '0 1px 2px 0 rgba(60, 64, 67, .3), 0 1px 3px 1px rgba(60, 64, 67, .15)',
        }}
      >
        <video
          autoPlay
          ref={videoRef}
          className='aspect-video size-full object-cover'
          style={{ transform: 'rotateY(180deg)' }}
        />
        <button
          type='button'
          className='absolute bottom-0 left-1/2 size-12 -translate-x-1/2'
          onClick={handleVideoButton}
        >
          종료
        </button>
      </div>
      <div>test</div>
    </div>
  );
}
