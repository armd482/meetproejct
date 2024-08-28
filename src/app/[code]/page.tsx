'use client';

import { redirect } from 'next/navigation';
import { checkKey } from '@/lib/checkKey';
import { useContext } from 'react';

import { PanelContext } from '@/context/MeetingContext';
import { MicOnIcon } from '@/asset';
import { ControlBar, Panel } from './component';

interface MeetingPageProps {
  params: Record<string, string>;
}

export default function Page({ params }: MeetingPageProps) {
  const { code } = params;

  if (!checkKey(code)) {
    redirect('/landing');
  }

  const { panelType } = useContext(PanelContext);

  return (
    <div className='relative flex size-full flex-col'>
      <div className='flex flex-1'>
        <div className='flex-1 border border-solid border-black'>
          <MicOnIcon width={22} height={22} fill='#00ff00' />
        </div>
        {panelType && <Panel />}
      </div>
      <ControlBar code={code} />
    </div>
  );
}
