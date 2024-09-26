import { DeviceSelectBox } from '@/component';
import { useDeviceStore } from '@/store/DeviceStore';
import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import * as Icon from '@/asset/icon';

interface VideoSettingProps {
  stream: MediaStream | null;
  onUpdateStream: () => void;
}

export default function VideoSetting({ stream, onUpdateStream }: VideoSettingProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { videoInput, videoInputList, setVideoInput, permission } = useDeviceStore(
    useShallow((state) => ({
      videoInput: state.videoInput,
      videoInputList: state.videoInputList,
      setVideoInput: state.setVideoInput,
      permission: state.permission,
    })),
  );

  const handleVideoChange = (id: string) => {
    const newVideo = videoInputList.find((track) => track.deviceId === id);
    if (!newVideo) {
      return;
    }
    setVideoInput({ name: newVideo.label, id: newVideo.deviceId });
    onUpdateStream();
  };

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className='flex items-center sm:block'>
      <div className='min-w-[100px]' style={{ flex: '1 1 100px' }}>
        <div>
          <p className='mb-2 text-sm font-medium text-[#1A73E8]'>카메라</p>
        </div>
        <DeviceSelectBox
          currentValue={videoInput}
          deviceList={videoInputList}
          onChange={handleVideoChange}
          DeviceIcon={Icon.VideoOn}
          disabled={!(permission && permission.video)}
        />
      </div>
      <div className='ml-6 flex w-40 items-center justify-center pt-7'>
        {permission?.video ? (
          <video
            autoPlay
            muted
            ref={videoRef}
            className='aspect-video h-[58px] object-cover'
            style={{ transform: 'rotateY(180deg)' }}
          />
        ) : (
          <div className='flex h-14 w-[160px] items-center justify-center bg-[#F1F3F4] text-sm text-[#202124]'>
            카메라 차단됨
          </div>
        )}
      </div>
    </div>
  );
}
