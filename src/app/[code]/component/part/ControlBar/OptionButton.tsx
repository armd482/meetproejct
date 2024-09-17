'use client';

import { ReactNode, useEffect, useState, MouseEvent, useCallback } from 'react';
import * as Icon from '@/asset/icon';
import { ButtonTag } from '@/component';
import { StreamStatusType } from '@/type/streamType';
import { useOutsideClick } from '@/hook';
import { useDeviceStore } from '@/store/DeviceStore';
import { useShallow } from 'zustand/react/shallow';
import DeviceList from './DeviceList';

interface OptionButtonProps {
  type: 'audio' | 'video';
  onClickButton?: (type: 'audio' | 'video') => void;
  onClickChevron?: (isClicked: boolean) => void;
  isVisibleOption?: boolean;
  clickedIcon: ReactNode;
  icon: ReactNode;
  name: Record<'chevron' | 'icon', string>;
  stream?: MediaStream | null;
  status: StreamStatusType;
  changeDevice: (type: 'audio' | 'video', value: boolean | string) => Promise<MediaStream | undefined>;
}

export default function OptionButton({
  type,
  onClickButton,
  onClickChevron,
  isVisibleOption = true,
  clickedIcon,
  icon,
  name,
  stream = null,
  status,
  changeDevice,
}: OptionButtonProps) {
  const { deviceEnable, permission } = useDeviceStore(
    useShallow((state) => ({
      deviceEnable: state.deviceEnable,
      permission: state.permission,
    })),
  );

  const [isPending, setIsPending] = useState(false);
  const [isClickedChevron, setIsClickedChevron] = useState(false);
  const [currentHover, setCurrentHover] = useState<'chevron' | 'icon'>('icon');

  const isDisabled = !(type === 'audio'
    ? Boolean(permission && permission.audio)
    : Boolean(permission && permission.video));

  const { targetRef } = useOutsideClick<HTMLDivElement>(() => {
    setIsClickedChevron(false);
  });

  const handleButtonClick = useCallback(async () => {
    if (isDisabled && onClickButton) {
      onClickButton(type);
      return;
    }
    setIsPending(true);
    await changeDevice(type, !deviceEnable[type]);
    setIsPending(false);
  }, [deviceEnable, changeDevice, isDisabled, onClickButton, type]);

  const handleChevronClick = () => {
    setIsClickedChevron((prev) => {
      if (onClickChevron) {
        onClickChevron(!prev);
      }
      return !prev;
    });
  };

  const handleButtonMouseEnter = () => {
    setCurrentHover('icon');
  };

  const handleChevronMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentHover('chevron');
  };

  useEffect(() => {
    if (!isVisibleOption) {
      setIsClickedChevron(false);
    }
  }, [isVisibleOption]);

  return (
    <div ref={targetRef}>
      <ButtonTag
        name={name[currentHover]}
        align={name.chevron !== '영상 설정' || currentHover !== 'chevron' ? 'left' : 'center'}
      >
        <div
          className={`relative flex h-12 ${isVisibleOption ? 'w-[88px]' : 'w-12'} items-center ${deviceEnable[type] ? 'rounded-[26px]' : 'rounded-xl'} ${deviceEnable[type] ? 'bg-[#282A2C] hover:bg-[#2D2F31] active:bg-[#3B3D3F]' : 'bg-[#5F1312] hover:bg-[#641B1A] active:bg-[#6E2B2A]'} duration-150 `}
        >
          {isVisibleOption && (
            <button
              type='button'
              className='flex size-12 items-center justify-center pl-1'
              onClick={handleChevronClick}
              onMouseEnter={handleChevronMouseEnter}
              disabled={isPending}
            >
              <Icon.Chevron
                width={10}
                height={10}
                className={`${!isClickedChevron && 'rotate-180'} duration-75`}
                fill={deviceEnable[type] ? '#8E918F' : '#F9DEDC'}
              />
            </button>
          )}
          <button
            type='button'
            onClick={handleButtonClick}
            className={` flex items-center justify-center ${deviceEnable[type] ? 'rounded-full bg-[#333537] hover:bg-[#414345]' : 'rounded-xl bg-[#F9DEDC]'} size-12 duration-150`}
            onMouseEnter={handleButtonMouseEnter}
          >
            <div className='delay-150'>{deviceEnable[type] ? icon : clickedIcon}</div>
          </button>
          {isDisabled && (
            <div className='absolute right-0 top-0 size-3 rounded-full bg-black'>
              <Icon.Warn width={20} height={20} fill='#FFE07C' className='relative -left-1 -top-1' />
            </div>
          )}
        </div>
      </ButtonTag>
      {isClickedChevron && <DeviceList type={type} stream={stream} status={status} changeDevice={changeDevice} />}
    </div>
  );
}
