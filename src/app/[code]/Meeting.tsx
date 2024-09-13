'use client';

import { useOpenvidu } from '@/hook';
import { useDeviceStore } from '@/store/DeviceStore';
import { useShallow } from 'zustand/react/shallow';
import { useContext, useEffect, useState } from 'react';
import { UserInfoContext } from '@/context/userInfoContext';
import { usePathname } from 'next/navigation';
import { getCurrentDeviceInfo } from '@/lib/getCurrentDeviceInfo';
import { ControlBar, InfoBar, Panel, Toggle, MeetInfoBar } from './component';

export default function Meetting() {
  const { name } = useContext(UserInfoContext);
  const pathname = usePathname();
  const { subscribers, participants, stream, changeDevice, handleUpdateStream } = useOpenvidu(
    pathname.slice(1),
    name as string,
  );
  const { audioInput, videoInput, permission } = useDeviceStore(
    useShallow((state) => ({
      audioInput: state.audioInput,
      videoInput: state.videoInput,
      audioInputList: state.audioInputList,
      videoInputList: state.videoInputList,
      permission: state.permission,
    })),
  );
  return (
    <div className='relative flex h-screen w-screen flex-col overflow-hidden bg-[#202124]'>
      <div className='flex flex-1 gap-4 overflow-hidden p-4'>
        <div className='flex-1 border border-solid border-black'>test</div>
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
