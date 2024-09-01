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
import { ControlButton, MenuButton, OptionButton } from './part/ControlBar';
import CallEndButton from './part/ControlBar/CallEndButton';

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

  const handleCcButtonClick = (isClicked: boolean) => {
    if (isClicked) {
      console.log('Clicked');
      return;
    }
    console.log('canceled');
  };

  const handleEmojiButtonClick = (isClicked: boolean) => {
    if (isClicked) {
      console.log('Clicked');
      return;
    }
    console.log('canceled');
  };

  const handleScreenShareButtonClick = (isClicked: boolean) => {
    if (isClicked) {
      console.log('Clicked');
      return;
    }
    console.log('canceled');
  };

  const handleHandButtonClick = (isClicked: boolean) => {
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
      <ControlButton
        onClickButton={handleCcButtonClick}
        icon={<CcIcon width={24} height={24} fill='#06306D' />}
        clickedIcon={<CcIcon width={24} height={24} fill='#E3E3E3' />}
        name='자막 사용(c)'
      />
      <ControlButton
        onClickButton={handleEmojiButtonClick}
        icon={<EmojiOffIcon width={24} height={24} fill='#06306D' />}
        clickedIcon={<EmojiOnIcon width={24} height={24} fill='#E3E3E3' />}
        name='반응 보내기'
      />
      <ControlButton
        onClickButton={handleScreenShareButtonClick}
        icon={<ScreenShareIcon width={24} height={24} fill='#06306D' />}
        clickedIcon={<ScreenShareIcon width={24} height={24} fill='#E3E3E3' />}
        name='발표 시작'
      />
      <ControlButton
        onClickButton={handleHandButtonClick}
        icon={<HandOffIcon width={24} height={24} fill='#06306D' />}
        clickedIcon={<HandOnIcon width={24} height={24} fill='#E3E3E3' />}
        name='손들기(ctrl + alt + h)'
      />
      <MenuButton />
      <CallEndButton />
    </div>
  );
}
