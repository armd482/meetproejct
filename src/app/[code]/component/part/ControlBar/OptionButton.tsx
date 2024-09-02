'use client';

import { ChevronIcon } from '@/asset';
import { ButtonTag } from '@/component';
import { ReactNode, useEffect, useState, MouseEvent } from 'react';

interface OptionButtonProps {
  onClickButton: (isClicked: boolean) => void;
  onClickChevron: (isClicked: boolean) => void;
  isVisibleOption?: boolean;
  clickedIcon: ReactNode;
  icon: ReactNode;
  name: Record<'chevron' | 'icon', string>;
}

export default function OptionButton({
  onClickButton,
  onClickChevron,
  isVisibleOption = true,
  clickedIcon,
  icon,
  name,
}: OptionButtonProps) {
  const [isClickedButton, setIsClickedButton] = useState(false);
  const [isClickedChevron, setIsClickedChevron] = useState(false);
  const [currentHover, setCurrentHover] = useState<'chevron' | 'icon'>('icon');

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

  const handleButtonMouseEnter = () => {
    setCurrentHover('icon');
  };

  const handleChevronMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentHover('chevron');
  };

  useEffect(() => {
    if (!isVisibleOption) {
      setIsClickedChevron(false);
    }
  }, [isVisibleOption]);

  return (
    <ButtonTag
      name={name[currentHover]}
      align={
        name.chevron !== '영상 설정' || currentHover !== 'chevron'
          ? 'left'
          : 'center'
      }
    >
      <div
        className={`relative h-12 ${isVisibleOption ? 'w-[88px]' : 'w-12'} items-center ${isClickedButton ? 'rounded-xl' : 'rounded-[26px]'} ${isClickedButton ? 'bg-[#5F1312] hover:bg-[#641B1A] active:bg-[#6E2B2A]' : 'bg-[#282A2C] hover:bg-[#2D2F31] active:bg-[#3B3D3F]'} duration-150 `}
      >
        {isVisibleOption && (
          <button
            type='button'
            className='flex size-12 items-center justify-center pl-1'
            onClick={handleChevronClick}
            onMouseEnter={handleChevronMouseEnter}
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
          onMouseEnter={handleButtonMouseEnter}
        >
          <div className='delay-150'>
            {isClickedButton ? clickedIcon : icon}
          </div>
        </button>
      </div>
    </ButtonTag>
  );
}
