import React, { useState, MouseEvent, useEffect, ReactNode } from 'react';
import * as Icon from '@/asset/icon';
import { DeviceType } from '@/type/streamType';
import { useOutsideClick } from '@/hook';
import ButtonTag from './ButtonTag';

interface DeviceSelectBoxProps {
  currentValue: DeviceType;
  deviceList: MediaDeviceInfo[];
  onChange: (id: string) => void;
  DeviceIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
}

interface BoxWrapperProps {
  children: ReactNode;
  disabled: boolean;
}

function BoxWrapper({ children, disabled }: BoxWrapperProps) {
  return disabled ? (
    <ButtonTag name='권한 필요' position='bottom'>
      {children}
    </ButtonTag>
  ) : (
    children
  );
}

export default function DeviceSelectBox({
  currentValue,
  deviceList,
  onChange,
  DeviceIcon,
  disabled = false,
}: DeviceSelectBoxProps) {
  const [isClicked, setIsClicked] = useState(false);
  const { targetRef } = useOutsideClick<HTMLDivElement>(() => {
    setIsClicked(false);
  });

  const handleSelectButtonClick = () => {
    setIsClicked((prev) => !prev);
  };

  const handleDeviceButtonClick = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    onChange(id);
    setIsClicked(false);
  };

  useEffect(() => {
    if (disabled) {
      setIsClicked(false);
    }
  }, [disabled]);

  return (
    <BoxWrapper disabled={disabled}>
      <div className='relative w-full' ref={targetRef}>
        <button
          type='button'
          className={`relative flex h-14 w-full min-w-16 items-center gap-2 truncate rounded-[4px] border border-solid ${disabled ? 'border-[#E7E8E8]' : 'border-[#80868B]'} pl-[10px] pr-[25px] ${!disabled && 'hover:bg-[#F6FAFE] active:border-[#1B77E4] active:bg-[#DBE9FB]'} `}
          onClick={handleSelectButtonClick}
          disabled={disabled}
        >
          <DeviceIcon width={16} height={16} fill={disabled ? '#B5B6B7' : '#3C4043'} />
          <p
            className={`w-full truncate text-left ${disabled ? 'text-[#B5B6B7]' : 'text-[#3C4043]'}`}
            style={{ maxWidth: 'calc(100vw - 512px)' }}
          >
            {disabled ? '권한 필요' : currentValue.name}
          </p>
          <Icon.ChevronFill
            width={10}
            height={10}
            fill={disabled ? '#B5B6B7' : '#3C4043'}
            className='absolute right-3 top-6'
          />
        </button>
        {isClicked && (
          <div
            className='absolute left-0 top-full max-h-[376.2px] min-w-[260px] max-w-[498.4px] rounded-[4px] py-[6px] bg-white z-10'
            style={{
              boxShadow: '0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)',
            }}
          >
            {deviceList.map((device) => (
              <button
                key={device.deviceId}
                type='button'
                onClick={(e) => handleDeviceButtonClick(e, device.deviceId)}
                className='relative h-11 w-full truncate bg-white pl-14 pr-4 hover:bg-[#F5F5F5] active:bg-[#D7D7D7]'
              >
                <p
                  className={`w-full truncate ${device.deviceId === currentValue.id ? 'text-[#1A73E8]' : 'text-black'} text-left`}
                >
                  {device.label}
                </p>
                {device.deviceId === currentValue.id && (
                  <Icon.Check width={24} height={24} fill='#1A73E8' className='absolute left-4 top-2.5 ' />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </BoxWrapper>
  );
}
