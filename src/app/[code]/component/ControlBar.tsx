'use client';

import {
  MicOnIcon,
  MicOffIcon,
  VideoOnIcon,
  VideoOffIcon,
  CcIcon,
  EmojiOffIcon,
  EmojiOnIcon,
  ScreenShareIcon,
  HandOffIcon,
  HandOnIcon,
} from '@/asset';
import { ToggleType } from '@/type/toggleType';
import { ReactNode } from 'react';
import { ControlButton, MenuButton, OptionButton } from './part/ControlBar';
import CallEndButton from './part/ControlBar/CallEndButton';

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
    icon: <CcIcon {...CONTROL_BUTTON_OFF_PROPS} />,
    clickedIcon: <CcIcon {...CONTROL_BUTTON_ON_PROPS} />,
  },
  {
    name: '반응 보내기',
    type: 'emoji',
    icon: <EmojiOffIcon {...CONTROL_BUTTON_OFF_PROPS} />,
    clickedIcon: <EmojiOnIcon {...CONTROL_BUTTON_ON_PROPS} />,
  },
  {
    name: '발표 시작',
    type: 'screen',
    icon: <ScreenShareIcon {...CONTROL_BUTTON_OFF_PROPS} />,
    clickedIcon: <ScreenShareIcon {...CONTROL_BUTTON_ON_PROPS} />,
  },
  {
    name: '손들기(ctrl + alt + h)',
    type: 'handsUp',
    icon: <HandOffIcon {...CONTROL_BUTTON_OFF_PROPS} />,
    clickedIcon: <HandOnIcon {...CONTROL_BUTTON_ON_PROPS} />,
  },
];

export default function ControlBar() {
  const handleMicButtonClick = (isClicked: boolean) => {
    if (isClicked) {
      console.log('Clicked');
      return;
    }
    console.log('canceled');
  };

  const handleMicChevronClick = (isClicked: boolean) => {
    if (isClicked) {
      console.log('Clicked');
      return;
    }
    console.log('canceled');
  };

  const handleVideoButtonClick = (isClicked: boolean) => {
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

  return (
    <div className='z-10 flex h-12 items-center gap-2 bg-[#212121]'>
      <OptionButton
        onClickButton={handleMicButtonClick}
        onClickChevron={handleMicChevronClick}
        isVisibleOption
        icon={<MicOnIcon width={20} height={20} fill='#E3E3E3' />}
        clickedIcon={<MicOffIcon width={20} height={20} fill='#5F1312' />}
        name={{ chevron: '오디오 설정', icon: '마이크 끄기(ctrl + d)' }}
      />
      <OptionButton
        onClickButton={handleVideoButtonClick}
        onClickChevron={handleVideoChevronClick}
        isVisibleOption
        icon={<VideoOnIcon width={26} height={26} fill='#E3E3E3' />}
        clickedIcon={<VideoOffIcon width={24} height={24} fill='#5F1312' />}
        name={{ chevron: '영상 설정', icon: '마이크 끄기(ctrl + d)' }}
      />
      {CONTROL_BUTTON.map((button) => (
        <ControlButton key={button.type} {...button} />
      ))}
      <MenuButton />
      <CallEndButton />
    </div>
  );
}
