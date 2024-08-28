'use client';

import { useCurrentDate } from '@/hook/useCurrentDate';
import { formatTime } from '@/lib/formatDate';
import { MicOnIcon, MicOffIcon, VideoOnIcon, VideoOffIcon } from '@/asset';
import { OptionButton } from './part/ControlBar';

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
        <div className='flex h-12 items-center gap-2 bg-[#212121]'>
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
          <div>button</div>
          <div>button</div>
        </div>
        <div className='absolute right-5 top-1/2 -translate-y-1/2'>456</div>
      </div>
    </div>
  );
}
