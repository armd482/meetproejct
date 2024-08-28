'use client';

import { ChevronIcon } from '@/asset';
import { ReactNode, useEffect, useState } from 'react';

interface OptionButtonProps {
  onClickButton: (isClicked: boolean) => void;
  onClickChevron: (isClicked: boolean) => void;
  isVisibleOption?: boolean;
  clickedIcon: ReactNode;
  icon: ReactNode;
}

export default function OptionButton({
  onClickButton,
  onClickChevron,
  isVisibleOption = true,
  clickedIcon,
  icon,
}: OptionButtonProps) {
  const [isClickedButton, setIsClickedButton] = useState(false);
  const [isClickedChevron, setIsClickedChevron] = useState(false);
  const handleButtonClick = () => {
    setIsClickedButton((prev) => {
      onClickButton(!prev);
      return !prev;
    });
  };
  const handleChevronClick = () => {
    setIsClickedChevron((prev) => {
      onClickChevron(!prev);
      return !prev;
    });
  };

  useEffect(() => {
    if (!isVisibleOption) {
      setIsClickedChevron(false);
    }
  }, [isVisibleOption]);

  return (
    <div
      className={`relative h-12 ${isVisibleOption ? 'w-[88px]' : 'w-12'} items-center ${isClickedButton ? 'rounded-xl' : 'rounded-[26px]'} ${isClickedButton ? 'bg-[#5F1312] hover:bg-[#641B1A] active:bg-[#6E2B2A]' : 'bg-[#282A2C] hover:bg-[#2D2F31] active:bg-[#3B3D3F]'} duration-150 `}
    >
      {isVisibleOption && (
        <button
          type='button'
          className='flex size-12 items-center justify-center pr-2'
          onClick={handleChevronClick}
        >
          <ChevronIcon
            width={10}
            height={10}
            className={`${!isClickedChevron && 'rotate-180'} duration-75`}
            fill={isClickedButton ? '#F9DEDC' : '#8E918F'}
          />
        </button>
      )}
      <button
        type='button'
        onClick={handleButtonClick}
        className={`absolute ${isVisibleOption ? 'left-10' : 'left-0'} top-0 flex items-center justify-center ${isClickedButton ? 'bg-[#F9DEDC]' : 'bg-[#333537] hover:bg-[#414345]'} size-12 ${isClickedButton ? 'rounded-xl' : 'rounded-full'} duration-150`}
      >
        <div className='delay-150'>{isClickedButton ? clickedIcon : icon}</div>
      </button>
    </div>
  );
}
