'use client';

import * as Icon from '@/asset/icon';

interface DeviceCardProps {
  device: MediaDeviceInfo;
  onClick: (device: MediaDeviceInfo) => void;
  isChoosed: boolean;
}

export default function DeviceCard({ device, isChoosed, onClick }: DeviceCardProps) {
  const handleButtonClick = () => {
    onClick(device);
  };

  return (
    <button
      type='button'
      className='relative flex h-10 w-[320px] items-center pl-14 pr-4 hover:bg-[#F5F5F5] active:bg-[#D7D7D7]'
      onClick={handleButtonClick}
    >
      <div className={`truncate text-sm ${isChoosed ? 'text-[#1A73E8]' : 'text-black'}`}>{device.label}</div>
      {isChoosed && (
        <div className='absolute left-4 top-1/2 -translate-y-1/2'>
          <Icon.Check width={24} height={24} fill='#1A73E8' />
        </div>
      )}
    </button>
  );
}
