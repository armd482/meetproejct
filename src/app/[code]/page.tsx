import { redirect } from 'next/navigation';

import { checkKey } from '@/lib/checkKey';
import { ControlBar, InfoBar, Panel, Toggle } from './component';
import MeetInfoBar from './component/MeetInfoBar';

interface MeetingPageProps {
  params: Record<string, string>;
}

export default function Page({ params }: MeetingPageProps) {
  const { code } = params;

  if (!checkKey(code)) {
    redirect('/landing');
  }

  return (
    <div className='relative flex size-full flex-col bg-black'>
      <div className='flex flex-1 p-4'>
        <div className='flex-1 border border-solid border-black'>test</div>
        <Panel />
      </div>
      <div className='relative w-full border border-solid border-black bg-black-87 font-googleSans text-base text-white'>
        <Toggle />
        <div className='relative flex flex-nowrap items-center justify-center bg-[#212121] py-4'>
          <MeetInfoBar />
          <ControlBar />
          <InfoBar />
        </div>
      </div>
    </div>
  );
}
