'use client';

import { ReactNode, useContext } from 'react';
import { PanelContext } from '@/context/MeetingContext';
import { PanelType } from '@/type/panelType';
import { ButtonTag } from '@/component';

interface IconButtonProps {
  icon: ReactNode;
  clickedIcon: ReactNode;
  type: PanelType;
  name: string;
  align?: 'left' | 'center' | 'right';
}

export default function IconButton({
  icon,
  clickedIcon,
  type,
  name,
  align = 'center',
}: IconButtonProps) {
  const { panelType, handlePanelType, handleOpenStatus } =
    useContext(PanelContext);
  const handleButtonClick = () => {
    if (panelType === type) {
      handlePanelType(null);
      return;
    }
    handlePanelType(type);
    handleOpenStatus(true);
  };
  return (
    <ButtonTag name={name} align={align}>
      <button
        type='button'
        onClick={handleButtonClick}
        className='flex size-12 items-center justify-center rounded-full bg-[#202124] hover:bg-[#2F3033]'
      >
        {panelType !== type ? icon : clickedIcon}
      </button>
    </ButtonTag>
  );
}
