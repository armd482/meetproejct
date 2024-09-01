'use client';

import { ButtonTag } from '@/component';
import { ReactNode, useState } from 'react';

interface ControlButtonProps {
  onClickButton: (isClicked: boolean) => void;
  icon: ReactNode;
  clickedIcon: ReactNode;
  name: string;
}

export default function ControlButton({
  onClickButton,
  icon,
  clickedIcon,
  name,
}: ControlButtonProps) {
  const [isClickedButton, setIsClickedButton] = useState(false);
  const handleButtonClick = () => {
    setIsClickedButton((prev) => {
      onClickButton(!prev);
      return !prev;
    });
  };
  return (
    <ButtonTag name={name}>
      <button
        type='button'
        onClick={handleButtonClick}
        className={`flex h-12 w-14 items-center justify-center ${isClickedButton ? 'rounded-xl bg-[#A8C8F8] hover:bg-[#9BBCEE] active:bg-[#A4C1ED]' : 'rounded-[26px] bg-[#333537] hover:bg-[#414345] active:bg-[#555758]'} duration-150`}
      >
        {isClickedButton ? icon : clickedIcon}
      </button>
    </ButtonTag>
  );
}
