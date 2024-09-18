'use client';

import { ReactNode, useContext } from 'react';
import { ButtonTag } from '@/component';
import { ToggleContext } from '@/context/ToggleContext';
import { ToggleType } from '@/type/toggleType';

interface ControlButtonProps {
  icon: ReactNode;
  clickedIcon: ReactNode;
  disabledIcon?: ReactNode;
  name: string;
  type: ToggleType;
  onClick?: (value: boolean | 'disable') => void;
}

export default function ControlButton({ icon, clickedIcon, disabledIcon, name, type, onClick }: ControlButtonProps) {
  const { toggleStatus, handleToggleStatus } = useContext(ToggleContext);
  const isClickedButton = toggleStatus[type];

  const handleButtonClick = () => {
    if (onClick) {
      onClick(typeof isClickedButton === 'boolean' ? !isClickedButton : 'disable');
    }
    if (isClickedButton !== 'disable') {
      handleToggleStatus(type);
    }
  };

  return (
    <ButtonTag name={name}>
      <button
        type='button'
        onClick={handleButtonClick}
        className={`flex h-12 w-14 items-center justify-center ${isClickedButton === 'disable' ? 'rounded-xl bg-[#491619]' : isClickedButton ? 'rounded-xl bg-[#A8C8F8] hover:bg-[#9BBCEE] active:bg-[#A4C1ED]' : 'rounded-[26px] bg-[#333537] hover:bg-[#414345] active:bg-[#555758]'} duration-150`}
      >
        {disabledIcon && isClickedButton === 'disable' ? disabledIcon : isClickedButton === true ? icon : clickedIcon}
      </button>
    </ButtonTag>
  );
}
