'use client';

import { useEffect, useRef } from 'react';

import { useDevice } from '@/hook/useDevice';
import { useDeviceStore } from '@/store/DeviceStore';
import * as Icon from '@/asset/icon';

export default function Device() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const deviceEnable = useDeviceStore((state) => state.deviceEnable);

  const { stream, isPendingStream, toggleVideoInput, toggleAudioInput } =
    useDevice();

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleMicButton = () => {
    toggleAudioInput();
  };

  const handleVideoButton = () => {
    toggleVideoInput();
  };

  return (
    <div className='w-full p-4 pb-0 pr-2'>
      <div
        className='relative mb-4 aspect-video w-full max-w-[764px] overflow-hidden rounded-lg'
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
          muted
        />
        {(!deviceEnable.video || isPendingStream) && (
          <div className='absolute top-0 flex size-full items-center justify-center bg-[#202124] text-2xl text-white'>
            {isPendingStream ? '카메라 시작 중' : '카메라가 꺼져 있음'}
          </div>
        )}

        <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-6 px-3'>
          <button
            type='button'
            onClick={handleMicButton}
            className={`flex items-center justify-center border border-solid ${deviceEnable.mic ? 'border-white' : 'border-[#EA4335] bg-[#EA4335]'} size-14 rounded-full`}
          >
            {deviceEnable.mic ? (
              <Icon.MicOn width={24} height={24} fill='#ffffff' />
            ) : (
              <Icon.MicOff width={24} height={24} fill='#ffffff' />
            )}
          </button>
          <button
            type='button'
            onClick={handleVideoButton}
            className={`flex items-center justify-center border border-solid ${deviceEnable.video ? 'border-white' : 'border-[#EA4335] bg-[#EA4335]'} size-14 rounded-full`}
          >
            {deviceEnable.video ? (
              <Icon.VideoOn width={24} height={24} fill='#ffffff' />
            ) : (
              <Icon.VideoOff width={24} height={24} fill='#ffffff' />
            )}
          </button>
        </div>
      </div>
      <div>test</div>
    </div>
  );
}
