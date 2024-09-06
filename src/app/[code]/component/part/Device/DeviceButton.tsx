import { ReactNode, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useDeviceStore } from '@/store/DeviceStore';
import * as Icon from '@/asset/icon';
import { useOutsideClick } from '@/hook';
import DeviceCard from './DeviceCard';

interface DeviceButtonIcon {
  icon: ReactNode;
  currentDevice: Record<'name' | 'id', string>;
  deviceList: MediaDeviceInfo[];
  type: 'audioInput' | 'audioOutput' | 'videoInput';
  onTrackChange: (device: MediaDeviceInfo, type: 'audioInput' | 'audioOutput' | 'videoInput') => void;
}

export default function DeviceButton({ icon, currentDevice, deviceList, type, onTrackChange }: DeviceButtonIcon) {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className='relative m-px font-googleSans' ref={targetRef}>
      <button
        type='button'
        onClick={handleButtonClick}
        className='flex h-[34px] items-center rounded-full border-[0.8px] border-solid border-white px-[10px] hover:border-[#DADCE0] hover:bg-[#F6FAFE]'
      >
        <div className='mr-2 flex size-[18px] items-center justify-center'>{icon}</div>
        <p className='w-[105px] truncate text-sm text-[#5f6368]'>{currentDevice.name}</p>
        <div className='w-[18px]'>
          <Icon.Chevron width={12} height={12} fill='#5F6368' />
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
        </div>
      )}
    </div>
  );
}
