import * as Icon from '@/asset/icon';
import { ButtonTag } from '@/component';
import { getRandomHexColor } from '@/lib/getRandomColor';

interface UserListCardProps {
  name: string;
  host?: boolean;
  isMicOn: boolean;
}

export default function UserListCard({ name, host, isMicOn }: UserListCardProps) {
  return (
    <div className='flex h-14 flex-1 items-center justify-between'>
      <div className='flex select-none items-center gap-4 bg-white font-googleSans text-[#202124]'>
        <Icon.Profile width={32} height={32} fill={getRandomHexColor()} />
        <div>
          <p className='max-w-[180px] truncate text-sm'>{name}</p>
          {host && <p className='text-xs text-[#5F6368]'>회의 호스트</p>}
        </div>
      </div>
      <div className='flex items-center'>
        <div className='flex size-12 items-center justify-center'>
          {isMicOn ? (
            <div className='flex size-6 items-center justify-center rounded-full bg-[#1A73E8]'>
              <Icon.Menu width={18} height={18} fill='#ffffff' />
            </div>
          ) : (
            <Icon.MicOff width={24} height={24} fill='#5F6368' />
          )}
        </div>
        <ButtonTag name='추가 작업' position='bottom'>
          <button type='button' className='flex size-12 items-center justify-center rounded-full hover:bg-[#EFEFEF]'>
            <Icon.Menu width={18} height={18} fill='#5F6368' className='rotate-90' />
          </button>
        </ButtonTag>
      </div>
    </div>
  );
}
