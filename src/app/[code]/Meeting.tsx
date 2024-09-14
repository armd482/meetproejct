'use client';

import { useOpenvidu } from '@/hook';
import { useContext, useEffect } from 'react';
import { UserInfoContext } from '@/context/userInfoContext';
import { usePathname } from 'next/navigation';
import { useDeviceStore } from '@/store/DeviceStore';
import { useShallow } from 'zustand/react/shallow';
import { ControlBar, InfoBar, Panel, Toggle, MeetInfoBar } from './component';
import VideoStream from './component/VideoStream';
import { deleteParticipant, postParticipant } from '../api/mongoAPI';

export default function Meetting() {
  const { name, color } = useContext(UserInfoContext);
  const pathname = usePathname();
  const { deviceEnable } = useDeviceStore(
    useShallow((state) => ({
      deviceEnable: state.deviceEnable,
    })),
  );
  const { subscribers, participants, publisher, stream, user, changeDevice, handleUpdateStream } = useOpenvidu(
    pathname.slice(1),
    name as string,
    color as string,
  );

  const userList = subscribers.map((entity) => {
    const { name: userName, color: userColor, audio, video } = participants[entity[0]];
    return {
      id: entity[0],
      name: userName,
      color: userColor,
      isMicOn: audio,
      isVideoOn: video,
      stream: entity[1].stream.getMediaStream(),
    };
  });

  useEffect(() => {
    const registParticipant = async () => {
      if (user.id && user.name && user.color) {
        await postParticipant(pathname.slice(1), user.id, user.name, user.color);
      }
    };

    const deleteDB = async () => {
      if (user.id) {
        await deleteParticipant(pathname.slice(1), user.id);
      }
    };

    registParticipant();
    return () => {
      deleteDB();
    };
  }, [user, pathname]);

  return (
    <div className='relative flex h-screen w-screen flex-col overflow-hidden bg-[#202124]'>
      <div className='flex size-full flex-1 gap-4 p-4'>
        <div
          className='grid size-full flex-1 gap-4 border border-solid border-black'
          style={{
            gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(subscribers.length + 1))}, 1fr)`,
          }}
        >
          {publisher && <VideoStream user={{ ...user, ...deviceEnable }} subscriber={publisher} muted />}
          {subscribers.map((entity) => (
            <VideoStream key={entity[0]} user={{ id: entity[0], ...participants[entity[0]] }} subscriber={entity[1]} />
          ))}
        </div>
        <Panel
          userList={[
            {
              id: user.id,
              name: name as string,
              color: color as string,
              isMicOn: deviceEnable.audio,
              isVideoOn: deviceEnable.video,
              stream: stream as MediaStream,
            },
            ...userList,
          ]}
        />
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
