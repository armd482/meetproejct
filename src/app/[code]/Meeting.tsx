'use client';

import { useOpenvidu } from '@/hook';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useDeviceStore } from '@/store/DeviceStore';
import { useShallow } from 'zustand/react/shallow';
import { useUserInfoStore } from '@/store/UserInfoStore';
import { ControlBar, InfoBar, Panel, Toggle, MeetInfoBar } from './component';
import VideoStream from './component/VideoStream';
import { deleteParticipant, postParticipant } from '../api/mongoAPI';

export default function Meetting() {
  const pathname = usePathname();
  const { deviceEnable } = useDeviceStore(
    useShallow((state) => ({
      deviceEnable: state.deviceEnable,
    })),
  );

  const { id, name, color } = useUserInfoStore(
    useShallow((state) => ({
      id: state.id,
      name: state.name,
      color: state.color,
    })),
  );

  const { subscribers, participants, publisher, stream, chatList, changeDevice, handleUpdateStream, sendMessage } =
    useOpenvidu(pathname.slice(1));

  const barRef = useRef<HTMLDivElement>(null);

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
      if (id && name && color) {
        await postParticipant(pathname.slice(1), id, name, color);
      }
    };

    const deleteDB = async () => {
      if (id) {
        await deleteParticipant(pathname.slice(1), id);
      }
    };

    registParticipant();
    return () => {
      deleteDB();
    };
  }, [id, color, name, pathname]);

  return (
    <div className='relative flex h-screen w-screen flex-col overflow-hidden bg-[#202124]'>
      <div className='flex flex-1 p-4' style={{ height: `calc(100vh - ${barRef.current?.clientHeight}px)` }}>
        <div
          className='grid flex-1 gap-4 border border-solid border-black'
          style={{
            gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(subscribers.length + 1))}, 1fr)`,
          }}
        >
          {publisher && <VideoStream user={{ id, name, color, ...deviceEnable }} subscriber={publisher} muted />}
          {subscribers.map((entity) => (
            <VideoStream key={entity[0]} user={{ id: entity[0], ...participants[entity[0]] }} subscriber={entity[1]} />
          ))}
        </div>
        <Panel
          userList={[
            {
              id,
              name,
              color,
              isMicOn: deviceEnable.audio,
              isVideoOn: deviceEnable.video,
              stream: stream as MediaStream,
            },
            ...userList,
          ]}
          chatList={chatList}
          onSendMessage={sendMessage}
        />
      </div>
      <div ref={barRef} className='relative w-full shrink-0 bg-[#202124] font-googleSans text-base text-white'>
        <Toggle />
        <div className='relative grid shrink-0 grid-cols-[1fr_auto_1fr] items-center bg-[#212121] p-4'>
          <MeetInfoBar />
          <ControlBar changeDevice={changeDevice} stream={stream} handleUpdateStream={handleUpdateStream} />
          <InfoBar />
        </div>
      </div>
    </div>
  );
}
