'use client';

import { useEffect, useState } from 'react';
import * as Icon from '@/asset/icon';
import UserListCard from './UserListCard';

interface UserPanelProps {
  filterValue?: string;
  userList: string[];
}

export default function UserPanel({ filterValue, userList }: UserPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<string[]>(userList);

  const handleClickButton = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (filterValue) {
      setCurrentUser(userList);
    }
  }, [filterValue, userList]);
  return (
    <div>
      <button
        type='button'
        className={`relative flex h-10 w-full items-center justify-between rounded-t-lg ${!isOpen && 'rounded-b-lg'} border border-solid border-[#DADCE0]`}
        onClick={handleClickButton}
      >
        <div className='flex flex-1 items-center justify-between px-5 font-googleSans text-sm text-[#202124]'>
          <p>참여자</p>
          <p className='font-medium'>{currentUser.length}</p>
        </div>
        <div className='flex size-10 items-center justify-center pr-2'>
          <Icon.Chevron
            width={12}
            height={12}
            fill='#202124'
            className={`${isOpen && 'rotate-180'} stroke-[#202124] stroke-[8px] duration-150`}
          />
        </div>
      </button>
      {isOpen && (
        <div className='rounded-b-lg border border-t-0 border-solid border-[#DADCE0] py-2 pl-4 pr-1'>
          <UserListCard
            name='test1adfahdfkahfdklajdlkajdhalkjhfkladjhfkajhakldjfhaklfjlasfhkafhaksfhkasfhjklshfsljahfadfjlajfhdaklhalfj'
            isMicOn={false}
            host
          />
          <UserListCard name='test1' isMicOn />
          <UserListCard name='test1' isMicOn={false} />
        </div>
      )}
    </div>
  );
}
