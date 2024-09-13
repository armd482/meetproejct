'use client';

import { useDeviceStore } from '@/store/DeviceStore';
import { useShallow } from 'zustand/react/shallow';
import * as Icon from '@/asset/icon';
import { StreamStatusType } from '@/type/streamType';
import { DeviceButton } from '../Device';
import { useEffect, useState } from 'react';

interface DeviceListProps {
  type: 'audio' | 'video';
  stream?: MediaStream | null;
  status: StreamStatusType;
  changeDevice: (type: 'audio' | 'video', value: boolean | string) => Promise<MediaStream | undefined>;
}

export default function DeviceList({ type, stream = null, status, changeDevice }: DeviceListProps) {
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const { audioInput, audioOutput, videoInput, audioInputList, audioOutputList, videoInputList } = useDeviceStore(
    useShallow((state) => ({
      audioInput: state.audioInput,
      audioOutput: state.audioOutput,
      videoInput: state.videoInput,
      audioInputList: state.audioInputList,
      audioOutputList: state.audioOuputList,
      videoInputList: state.videoInputList,
    })),
  );

  const handleTrackChange = async (device: MediaDeviceInfo, type: 'audioInput' | 'audioOutput' | 'videoInput') => {
    if (type === 'audioOutput') {
      return;
    }
    const result = await changeDevice(type === 'audioInput' ? 'audio' : 'video', device.deviceId);
    if (type === 'audioInput' && result) {
      setAudioStream(result);
    }
  };

  useEffect(() => {
    setAudioStream(stream);
  }, [stream]);

  return (
    <div className='absolute top-0 flex -translate-y-full items-center gap-[10px] rounded-[36px] bg-[#2C2C2C] p-[10px] duration-500'>
      {type === 'audio' ? (
        <>
          <DeviceButton
            type='audioInput'
            icon={<Icon.MicOn width={14} height={14} fill='#8AB4F8' />}
            deviceList={audioInputList}
            stream={audioStream}
            currentDevice={audioInput}
            status={status}
            color='black'
            onTrackChange={handleTrackChange}
            width={244}
          />
          <DeviceButton
            type='audioOutput'
            icon={<Icon.Sound width={14} height={14} fill='#8AB4F8' />}
            deviceList={audioOutputList}
            currentDevice={audioOutput}
            status={status}
            color='black'
            width={244}
          />
        </>
      ) : (
        <DeviceButton
          type='videoInput'
          icon={<Icon.VideoOn width={14} height={14} fill='#8AB4F8' />}
          deviceList={videoInputList}
          currentDevice={videoInput}
          status={status}
          color='black'
          onTrackChange={handleTrackChange}
          width={462}
        />
      )}
    </div>
  );
}
