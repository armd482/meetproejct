'use client';

import { InviteUserIcon, SearchIcon } from '@/asset';
import { UserList } from './part/Panel';

export default function UserPanel() {
  return (
    <div
      className='flex select-none flex-col overflow-hidden'
      style={{ height: 'calc(100% - 64px)' }}
    >
      <div className='px-[10px]'>
        <button
          type='button'
          className='flex h-12 w-fit items-center gap-2 rounded-full bg-[#C2E7FF] pl-4 pr-6 text-[#001D35]'
        >
          <InviteUserIcon width={24} height={24} fill='#001D35' />
          <p>사용자 추가</p>
        </button>
      </div>
      <div className='size-full overflow-auto px-[10px] py-[15px]'>
        <div className='relative w-full'>
          <SearchIcon
            width={24}
            height={24}
            fill='#5F6368'
            className='absolute left-4 top-1/2 -translate-y-1/2'
          />
          <input
            placeholder='사용자 검색'
            className='h-12 w-full rounded-[8px] border border-solid border-[#DFE1E4] pl-12 text-[#28292C] outline-[#1A73E8] hover:border-[#9AA0A6]'
          />
        </div>
        <div className='w-full'>
          <p className='my-[9.13px] pl-[14px] text-xs font-medium text-[#5F5A5E]'>
            참석 중인 사용자
          </p>
          <UserList userList={['사용자1', '사용자2', '사용자3']} />
        </div>
      </div>
    </div>
  );
}
