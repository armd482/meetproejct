'use client';

import { ReactNode, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useDeviceStore } from '@/store/DeviceStore';
import * as Icon from '@/asset/icon';
import { useOutsideClick, useVolume } from '@/hook';
import { StreamStatusType } from '@/type/streamType';
import DeviceCard from './DeviceCard';
import DeviceSubButton from './DeviceSubButton';

interface DeviceButtonIcon {
  icon: ReactNode;
  currentDevice: Record<'name' | 'id', string>;
  deviceList: MediaDeviceInfo[];
  type: 'audioInput' | 'audioOutput' | 'videoInput';
  stream?: MediaStream | null;
  onTrackChange: (device: MediaDeviceInfo, type: 'audioInput' | 'audioOutput' | 'videoInput') => void;
  status: StreamStatusType;
}

export default function DeviceButton({
  icon,
  currentDevice,
  deviceList,
  type,
  stream,
  status,
  onTrackChange,
}: DeviceButtonIcon) {
  const [isOpen, setIsOpen] = useState(false);
  const permission = useDeviceStore((state) => state.permission);

  const getDisabledStatus = () => {
    if (status === 'rejected' || status === 'failed') {
      return true;
    }

    if (type === 'audioInput' || type === 'audioOutput') {
      if (permission && !permission.audio) {
        return true;
      }
    }

    if (type === 'videoInput') {
      if (permission && !permission.video) {
        return true;
      }
    }

    return false;
  };

  const isDisabled = getDisabledStatus();

  const { volume } = useVolume(stream);

  const handleOutSideClick = () => {
    setIsOpen(false);
  };

  const { targetRef } = useOutsideClick<HTMLDivElement>(handleOutSideClick);

  const { setAudioInput, setAudioOutput, setVideoInput } = useDeviceStore(
    useShallow((state) => ({
      setAudioInput: state.setAudioInput,
      setAudioOutput: state.setAudioOutput,
      setVideoInput: state.setVideoInput,
    })),
  );

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCardClick = (device: MediaDeviceInfo) => {
    if (device.deviceId === currentDevice.id) {
      return;
    }

    if (type === 'audioInput') {
      setAudioInput({ name: device.label, id: device.deviceId });
    }

    if (type === 'videoInput') {
      setVideoInput({ name: device.label, id: device.deviceId });
    }
    if (type === 'audioOutput') {
      setAudioOutput({ name: device.label, id: device.deviceId });
    }

    onTrackChange(device, type);
  };

  const getStatusText = () => {
    if (type === 'audioInput' || type === 'audioOutput') {
      if ((permission && !permission.audio) || status === 'rejected') {
        return '권한 필요';
      }
    }

    if (type === 'audioInput') {
      if (status === 'failed' || !currentDevice.id) {
        return '마이크를 찾을 수 없습니다';
      }
    }

    if (type === 'audioOutput') {
      if (status === 'failed' || !currentDevice.id) {
        return '스피커를 찾을 수 없습니다';
      }
    }

    if (type === 'videoInput') {
      if (permission && !permission.video) {
        return '권한 필요';
      }
      if (status === 'failed' || !currentDevice.id) {
        return '카메라를 찾을 수 없습니다';
      }
    }
  };
  const disabledText = getStatusText();

  return (
    <div className='relative m-px font-googleSans' ref={targetRef}>
      <button
        type='button'
        onClick={handleButtonClick}
        disabled={isDisabled}
        className={`flex h-[34px] items-center rounded-full border-[0.8px] border-solid ${isDisabled ? 'border-[#E7E8E8]' : 'border-white  hover:border-[#DADCE0] active:bg-[#F6FAFE]'} px-[10px]`}
      >
        <div className='mr-2 flex size-[18px] items-center justify-center'>{icon}</div>
        <p className={`w-[105px] truncate text-sm text-left ${isDisabled ? 'text-[#B5B6B7]' : 'text-[#5f6368]'}`}>
          {isDisabled ? disabledText : currentDevice.name}
        </p>
        <div className='w-[18px]'>
          <Icon.Chevron width={12} height={12} fill={isDisabled ? '#B5B6B7' : '#5F6368'} />
        </div>
      </button>
      {isOpen && (
        <div
          className='absolute bottom-9 max-h-[609px] rounded-[4px] bg-white py-2 '
          style={{
            boxShadow: '0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)',
          }}
        >
          <div>
            {deviceList.map((device) => (
              <DeviceCard
                key={device.deviceId}
                device={device}
                isChoosed={device.deviceId === currentDevice.id}
                onClick={handleCardClick}
              />
            ))}
          </div>
          <DeviceSubButton type={type} volume={volume} />
        </div>
      )}
    </div>
  );
}