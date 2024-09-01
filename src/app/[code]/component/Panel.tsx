'use client';

import { useContext } from 'react';
import { PanelContext } from '@/context/MeetingContext';

export default function Panel() {
  const { panelType } = useContext(PanelContext);
  return (
    <div>
      {panelType && (
        <div className='h-full w-[368px] border border-solid border-black'>
          <div>{panelType}</div>
        </div>
      )}
    </div>
  );
}
