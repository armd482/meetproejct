import { useRef, useEffect } from 'react';
import { Subscriber, Publisher } from 'openvidu-browser';
import { useDeviceStore } from '@/store/DeviceStore';

interface ScreenStreamProps {
  subscriber: Subscriber | Publisher;
}

export default function ScreenStream({ subscriber }: ScreenStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioOutput = useDeviceStore((state) => state.audioOutput);

  useEffect(() => {
    if (videoRef.current) {
      subscriber.addVideoElement(videoRef.current);
      videoRef.current.setSinkId(audioOutput.id);
    }
  }, [subscriber, audioOutput]);
  return (
    <div className='relative flex items-center'>
      <div className=' relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-[#3C4043]'>
        <video
          ref={videoRef}
          autoPlay
          className='absolute left-0 top-0 size-full max-h-full min-h-0 min-w-0 max-w-full rounded-lg bg-[#3C4043] object-scale-down'
        />
      </div>
    </div>
  );
}
