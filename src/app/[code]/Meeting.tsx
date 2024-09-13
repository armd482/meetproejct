'use client';

import { useOpenvidu } from '@/hook';
import { useContext, useState } from 'react';
import { UserInfoContext } from '@/context/userInfoContext';
import { usePathname } from 'next/navigation';
import { ControlBar, InfoBar, Panel, Toggle, MeetInfoBar } from './component';
import VideoStream from './component/VideoStream';
import { useDeviceStore } from '@/store/DeviceStore';
import { useShallow } from 'zustand/react/shallow';

export default function Meetting() {
  const { name } = useContext(UserInfoContext);
  const pathname = usePathname();
  const { deviceEnable } = useDeviceStore(
    useShallow((state) => ({
      deviceEnable: state.deviceEnable,
    })),
  );
  const { subscribers, participants, publisher, stream, user, changeDevice, handleUpdateStream } = useOpenvidu(
    pathname.slice(1),
    name as string,
  );

  return (
    <div className='relative flex h-screen w-screen flex-col overflow-hidden bg-[#202124]'>
      <div className='flex flex-1 gap-4 overflow-hidden p-4'>
        <div
          className='grid flex-1 gap-4 border border-solid border-black'
          style={{
            gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(subscribers.length))}, 1fr)`,
          }}
        >
          {publisher && <VideoStream user={{ name: name as string, ...deviceEnable }} subscriber={publisher} muted />}
          {subscribers.map((entity) => (
            <VideoStream key={entity[0]} user={participants[entity[0]]} subscriber={entity[1]} />
          ))}
        </div>
        <Panel />
      </div>
      <div className='relative w-full bg-[#202124] font-googleSans text-base text-white'>
        <Toggle />
        <div className='relative grid grid-cols-[1fr_auto_1fr] items-center bg-[#212121] py-4'>
          <MeetInfoBar />
          <ControlBar changeDevice={changeDevice} stream={stream} handleUpdateStream={handleUpdateStream} />
          <InfoBar />
        </div>
      </div>
    </div>
  );
}
