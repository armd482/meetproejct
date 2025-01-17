'use client';

import { useEffect, useRef, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';

import { useDeviceStore } from '@/store/DeviceStore';
import { useUserInfoStore } from '@/store/UserInfoStore';
import { ToggleContext } from '@/context/ToggleContext';
import { useOpenvidu } from '@/hook';
import { Loading } from '@/component';
import {
  ControlBar,
  EmojiAnimation,
  InfoBar,
  Panel,
  Toggle,
  MeetInfoBar,
  StreamGridList,
  StreamScreenList,
} from './component';

export default function Meetting() {
  const pathname = usePathname();
  const { deviceEnable, permission } = useDeviceStore(
    useShallow((state) => ({
      deviceEnable: state.deviceEnable,
      permission: state.permission,
    })),
  );

  const { handleToggleStatus } = useContext(ToggleContext);

  const { id, name, color } = useUserInfoStore(
    useShallow((state) => ({
      id: state.id,
      name: state.name,
      color: state.color,
    })),
  );

  const {
    subscribers,
    participants,
    publisher,
    stream,
    chatList,
    screenPublisher,
    isMyScreenShare,
    emojiList,
    handsUpList,
    streamStatus,
    changeDevice,
    handleUpdateStream,
    sendMessage,
    shareScreen,
    stopShareScreen,
    leaveSession,
    sendEmoji,
    deleteEmoji,
    sendHandsUp,
  } = useOpenvidu(pathname.slice(1));

  const wrapperRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const userList = subscribers.map((entity) => {
    const { name: userName, color: userColor, audio, video } = participants[entity[0]];
    return {
      id: entity[0],
      name: userName,
      color: userColor,
      isMicOn: audio,
      isVideoOn: video,
      stream: entity[1]?.stream.getMediaStream() ?? null,
    };
  });

  useEffect(() => {
    if (!isMyScreenShare && screenPublisher) {
      handleToggleStatus('screen', 'disable');
      return;
    }
    handleToggleStatus('screen', Boolean(screenPublisher));
  }, [screenPublisher, isMyScreenShare, handleToggleStatus]);

  return (
    <div className='relative flex h-screen w-screen flex-col overflow-hidden bg-[#202124]'>
      <div className='relative flex flex-1 p-4' style={{ height: `calc(100vh - ${barRef.current?.clientHeight}px)` }}>
        <div ref={wrapperRef} className='relative flex-1 overflow-hidden'>
          {screenPublisher ? (
            <StreamScreenList
              screenPublisher={screenPublisher}
              participants={participants}
              subscribers={subscribers}
              publisher={publisher}
              emojiList={emojiList}
              handsUpList={handsUpList}
              stream={stream}
            />
          ) : (
            <StreamGridList
              subscribers={subscribers}
              publisher={publisher}
              participants={participants}
              emojiList={emojiList}
              handsUpList={handsUpList}
              stream={stream}
            />
          )}
          {emojiList.map((emoji) => (
            <EmojiAnimation
              key={emoji.id}
              emoji={emoji}
              maxWidth={wrapperRef.current?.clientWidth ?? 0}
              deleteEmoji={deleteEmoji}
            />
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
        <Toggle onClickEmojiButton={sendEmoji} />
        <div className='relative flex shrink-0 justify-between bg-[#212121] p-4'>
          <MeetInfoBar />
          <ControlBar
            changeDevice={changeDevice}
            stream={stream}
            streamStatus={streamStatus}
            handleUpdateStream={handleUpdateStream}
            handleScreenShare={shareScreen}
            handleStopScreenShare={stopShareScreen}
            handleLeavSession={leaveSession}
            handleHandsUp={sendHandsUp}
          />
          <InfoBar />
        </div>
      </div>
      <Loading isPending={Boolean(stream === null && !permission)} />
    </div>
  );
}
