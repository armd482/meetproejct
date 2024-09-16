'use client';

import { ReactNode, useContext } from 'react';
import { ButtonTag } from '@/component';
import { ToggleContext } from '@/context/ToggleContext';
import { ToggleType } from '@/type/toggleType';

interface ControlButtonProps {
  icon: ReactNode;
  clickedIcon: ReactNode;
  name: string;
  type: ToggleType;
  onClick?: (value: boolean) => void;
}

export default function ControlButton({ icon, clickedIcon, name, type, onClick }: ControlButtonProps) {
  const { toggleStatus, handleToggleStatus } = useContext(ToggleContext);
  const isClickedButton = toggleStatus[type];

  const handleButtonClick = () => {
    if (onClick) {
      onClick(!isClickedButton);
    }
    handleToggleStatus(type);
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
