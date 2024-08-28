'use client';

import { useCurrentDate } from '@/hook/useCurrentDate';
import { formatTime } from '@/lib/formatDate';
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

interface ControlBarProps {
  code: string;
}

export default function ControlBar({ code }: ControlBarProps) {
  const date = useCurrentDate();
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
    <div className='relative w-full border border-solid border-black bg-black-87 font-googleSans text-base text-white'>
      <div className='flex w-full items-center justify-center'>
        toggleWrapper
      </div>
      <div className='relative flex flex-nowrap items-center justify-center py-4'>
        <div className='absolute left-5 top-1/2 flex -translate-y-1/2 items-center gap-3'>
          <p>{formatTime(date)}</p>
          <div className='h-4 border-r border-solid border-white' />
          <p>{code}</p>
        </div>
        <div className='z-10 flex h-12 items-center gap-2 bg-[#212121]'>
          <OptionButton
            onClickButton={handleMicButtonClick}
            onClickChevron={handleMicChevronClick}
            isVisibleOption
            icon={<MicOnIcon width={24} height={24} fill='#E3E3E3' />}
            clickedIcon={<MicOffIcon width={24} height={24} fill='#5F1312' />}
          />
          <OptionButton
            onClickButton={handleVideoButtonClick}
            onClickChevron={handleVideoChevronClick}
            isVisibleOption
            icon={<VideoOnIcon width={24} height={24} fill='#E3E3E3' />}
            clickedIcon={<VideoOffIcon width={24} height={24} fill='#5F1312' />}
          />
          <ControlButton
            onClickButton={handleCcButtonClick}
            icon={<CcIcon width={24} height={24} fill='#06306D' />}
            clickedIcon={<CcIcon width={24} height={24} fill='#E3E3E3' />}
          />
          <ControlButton
            onClickButton={handleEmojiButtonClick}
            icon={<EmojiOffIcon width={24} height={24} fill='#06306D' />}
            clickedIcon={<EmojiOnIcon width={24} height={24} fill='#E3E3E3' />}
          />
          <ControlButton
            onClickButton={handleScreenShareButtonClick}
            icon={<ScreenShareIcon width={24} height={24} fill='#06306D' />}
            clickedIcon={
              <ScreenShareIcon width={24} height={24} fill='#E3E3E3' />
            }
          />
          <ControlButton
            onClickButton={handleHandButtonClick}
            icon={<HandOffIcon width={24} height={24} fill='#06306D' />}
            clickedIcon={<HandOnIcon width={24} height={24} fill='#E3E3E3' />}
          />
          <MenuButton />
        </div>
        <div className='absolute right-5 top-1/2 -translate-y-1/2'>456</div>
      </div>
    </div>
  );
}
