'use client';

import { useContext } from 'react';
import { PanelContext } from '@/context/PanelContext';
import { PanelType } from '@/type/panelType';
import { DeleteIcon } from '@/asset';
import { ButtonTag } from '@/component';
import { UserPanel, InfoPanel } from './part/Panel';

interface CurrentPanelProps {
  type: PanelType;
}

const PANEL_TITLE = {
  USER: '사용자',
  INFO: '회의 세부정보',
  CHAT: '회의 중 메시지',
  ACTIVE: '활동',
  HOST: '호스트 제어 기능',
};

function CurrentPanel({ type }: CurrentPanelProps) {
  if (type === 'USER') {
    return <UserPanel />;
  }
  if (type === 'INFO') {
    return <InfoPanel />;
  }
  return <div>{type}</div>;
}

export default function Panel() {
  const { panelType, isOpen, handlePanelType, handleOpenStatus } =
    useContext(PanelContext);

  const handleClickDeleteButton = () => {
    handlePanelType(null);
  };

  const handlePanelAnimationEnd = () => {
    if (panelType === null) {
      handleOpenStatus(false);
    }
  };

  return (
    <div className='h-full select-none'>
      {isOpen && (
        <div
          className={`h-full w-[368px] origin-top-right animate-slide-in-left rounded-lg bg-white ${panelType === null && 'animate-slide-out-left'}`}
          onAnimationEnd={handlePanelAnimationEnd}
        >
          {panelType && (
            <div className='size-full font-googleSans'>
              <div className='relative flex h-16 items-center px-6 py-3 text-lg text-[#202124]'>
                <p>{PANEL_TITLE[panelType]}</p>
                <div className='absolute right-3 top-1/2 size-12 -translate-y-1/2'>
                  <ButtonTag name='닫기' position='bottom'>
                    <button
                      type='button'
                      onClick={handleClickDeleteButton}
                      className='flex size-12 items-center justify-center rounded-full hover:bg-[#F0F1F1] active:bg-[#DEE0DF]'
                    >
                      <DeleteIcon width={24} height={24} fill='#444746' />
                    </button>
                  </ButtonTag>
                </div>
              </div>
              <CurrentPanel type={panelType} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
