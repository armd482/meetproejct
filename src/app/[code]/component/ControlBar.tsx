'use client';

import { ReactNode, useState } from 'react';
import * as Icon from '@/asset/icon';
import { ToggleType } from '@/type/toggleType';
import { useDeviceStore } from '@/store/DeviceStore';
import { useShallow } from 'zustand/react/shallow';
import { ControlButton, MenuButton, OptionButton, CallEndButton } from './part/ControlBar';
import { PermissionModal } from './part/Device';

interface ControlBarProps {
  stream: MediaStream | null;
  changeDevice: (type: 'audio' | 'video', value: boolean | string) => Promise<MediaStream | undefined>;
  handleUpdateStream: () => void;
}

interface ControlButtonType {
  name: string;
  type: ToggleType;
  icon: ReactNode;
  clickedIcon: ReactNode;
}

const CONTROL_BUTTON_OFF_PROPS = { width: 24, height: 24, fill: '#06306D' };
const CONTROL_BUTTON_ON_PROPS = { width: 24, height: 24, fill: '#E3E3E3' };

const CONTROL_BUTTON: ControlButtonType[] = [
  {
    name: '자막 사용(c)',
    type: 'caption',
    icon: <Icon.Cc {...CONTROL_BUTTON_OFF_PROPS} />,
    clickedIcon: <Icon.Cc {...CONTROL_BUTTON_ON_PROPS} />,
  },
  {
    name: '반응 보내기',
    type: 'emoji',
    icon: <Icon.EmojiOff {...CONTROL_BUTTON_OFF_PROPS} />,
    clickedIcon: <Icon.EmojiOn {...CONTROL_BUTTON_ON_PROPS} />,
  },
  {
    name: '발표 시작',
    type: 'screen',
    icon: <Icon.ScreenShare {...CONTROL_BUTTON_OFF_PROPS} />,
    clickedIcon: <Icon.ScreenShare {...CONTROL_BUTTON_ON_PROPS} />,
  },
  {
    name: '손들기(ctrl + alt + h)',
    type: 'handsUp',
    icon: <Icon.HandOff {...CONTROL_BUTTON_OFF_PROPS} />,
    clickedIcon: <Icon.HandOn {...CONTROL_BUTTON_ON_PROPS} />,
  },
];

export default function ControlBar({ stream, changeDevice, handleUpdateStream }: ControlBarProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { permission, audioInput, videoInput } = useDeviceStore(
    useShallow((state) => ({
      permission: state.permission,
      audioInput: state.audioInput,
      videoInput: state.videoInput,
    })),
  );

  const handleMicChevronClick = (isClicked: boolean) => {
    if (isClicked) {
      console.log('Clicked');
      return;
    }
    console.log('canceled');
  };

  const handleVideoChevronClick = (isClicked: boolean) => {
    if (isClicked) {
      console.log('Clicked');
      return;
    }
    console.log('canceled');
  };

  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  const handleButtonClick = (type: 'audio' | 'video') => {
    if (type === 'audio' && permission && permission.audio) {
      return;
    }
    if (type === 'video' && permission && permission.video) {
      return;
    }
    setIsOpenModal(true);
  };

  return (
    <div className='z-10 flex h-12 items-center gap-2 bg-[#212121]'>
      <OptionButton
        type='audio'
        onClickButton={handleButtonClick}
        onClickChevron={handleMicChevronClick}
        icon={<Icon.MicOn width={20} height={20} fill='#E3E3E3' />}
        clickedIcon={<Icon.MicOff width={20} height={20} fill='#5F1312' />}
        name={{ chevron: '오디오 설정', icon: '마이크 끄기(ctrl + d)' }}
        status='success'
        stream={stream}
        changeDevice={changeDevice}
      />
      <OptionButton
        type='video'
        onClickButton={handleButtonClick}
        onClickChevron={handleVideoChevronClick}
        icon={<Icon.VideoOn width={26} height={26} fill='#E3E3E3' />}
        clickedIcon={<Icon.VideoOff width={24} height={24} fill='#5F1312' />}
        name={{ chevron: '영상 설정', icon: '마이크 끄기(ctrl + d)' }}
        status='success'
        changeDevice={changeDevice}
      />
      {CONTROL_BUTTON.map((button) => (
        <ControlButton key={button.type} {...button} />
      ))}
      <MenuButton />
      <CallEndButton />
      <PermissionModal
        isOpenModal={isOpenModal}
        status={'success'}
        onClose={handleModalClose}
        onUpdateStream={handleUpdateStream}
      />
    </div>
  );
}
