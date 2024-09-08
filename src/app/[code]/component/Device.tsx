'use client';

import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useCheckChrome, useDevice } from '@/hook';
import { useDeviceStore } from '@/store/DeviceStore';
import * as Icon from '@/asset/icon';
import { setTrackChage } from '@/lib/setTrackChange';
import useVolume from '@/hook/useVolume';
import { Visualizer } from '@/component';
import DeviceButton from './part/Device/DeviceButton';

export default function Device() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { deviceEnable, audioInput, audioOutput, videoInput } = useDeviceStore(
    useShallow((state) => ({
      deviceEnable: state.deviceEnable,
      audioInput: state.audioInput,
      audioOutput: state.audioOutput,
      videoInput: state.videoInput,
    })),
  );

  const {
    stream,
    isPendingStream,
    audioInputList,
    videoInputList,
    audioOutputList,
    toggleVideoInput,
    toggleAudioInput,
  } = useDevice();

  const { isChrome } = useCheckChrome();

  const { volume, isExpand } = useVolume(stream);

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

  const handleTrackChange = async (device: MediaDeviceInfo, type: 'audioInput' | 'videoInput' | 'audioOutput') => {
    setTrackChage(stream, videoRef, device, type, audioInput.id, videoInput.id);
  };

  return (
    <div className='max-w-[764px] p-4 pr-2 lg-max:w-[448px] lg-max:pr-4'>
      <div
        className='relative aspect-video w-full overflow-hidden rounded-lg'
        style={{
          boxShadow: '0 1px 2px 0 rgba(60, 64, 67, .3), 0 1px 3px 1px rgba(60, 64, 67, .15)',
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
        {deviceEnable.mic && (
          <div className='absolute bottom-4 left-4'>
            <Visualizer volume={volume} isExpand={isExpand} />
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
      {isChrome && (
        <div className='mt-4 flex w-full items-center gap-1 lg-max:hidden'>
          <DeviceButton
            icon={<Icon.MicOn width={14} height={14} fill='#5F6368' />}
            currentDevice={audioInput}
            deviceList={audioInputList}
            type='audioInput'
            onTrackChange={handleTrackChange}
            volume={volume}
          />
          <DeviceButton
            icon={<Icon.Sound width={14} height={14} fill='#5F6368' />}
            currentDevice={audioOutput}
            deviceList={audioOutputList}
            type='audioOutput'
            onTrackChange={handleTrackChange}
          />
          <DeviceButton
            icon={<Icon.VideoOn width={14} height={14} fill='#5F6368' />}
            currentDevice={videoInput}
            deviceList={videoInputList}
            type='videoInput'
            onTrackChange={handleTrackChange}
          />
        </div>
      )}
    </div>
  );
}
