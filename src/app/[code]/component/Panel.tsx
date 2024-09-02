'use client';

import { useContext } from 'react';
import { PanelContext } from '@/context/MeetingContext';
import { PanelType } from '@/type/panelType';
import { DeleteIcon } from '@/asset';
import UserPanel from './UserPanel';

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
  return <div>{type}</div>;
}

export default function Panel() {
  const { panelType, handlePanelType } = useContext(PanelContext);

  const handleClickDeleteButton = () => {
    handlePanelType(null);
  };

  return (
    <div className='relative h-full overflow-hidden'>
      {panelType && (
        <div className='h-full w-[368px] overflow-hidden rounded-lg bg-white'>
          <div className='size-full overflow-hidden font-googleSans'>
            <div className='relative flex h-16 items-center px-6 py-3 text-lg text-[#202124]'>
              <p>{PANEL_TITLE[panelType]}</p>
              <button
                type='button'
                onClick={handleClickDeleteButton}
                className='absolute right-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full'
              >
                <DeleteIcon width={24} height={24} fill='#444746' />
              </button>
            </div>
            <CurrentPanel type={panelType} />
          </div>
        </div>
      )}
    </div>
  );
}
