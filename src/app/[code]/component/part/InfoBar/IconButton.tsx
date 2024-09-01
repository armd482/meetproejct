'use client';

import { ReactNode, useContext } from 'react';
import { PanelContext } from '@/context/MeetingContext';
import { PanelType } from '@/type/panelType';

interface IconButtonProps {
  icon: ReactNode;
  clickedIcon: ReactNode;
  type: PanelType;
}

export default function IconButton({
  icon,
  clickedIcon,
  type,
}: IconButtonProps) {
  const { panelType, handlePanelType } = useContext(PanelContext);
  const handleButtonClick = () => {
    if (panelType === type) {
      handlePanelType(null);
      return;
    }
    handlePanelType(type);
  };
  return (
    <button
      type='button'
      onClick={handleButtonClick}
      className='flex size-12 items-center justify-center rounded-full bg-[#202124] hover:bg-[#2F3033]'
    >
      {panelType !== type ? icon : clickedIcon}
    </button>
  );
}
