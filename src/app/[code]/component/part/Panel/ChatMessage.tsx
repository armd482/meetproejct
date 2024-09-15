import { memo } from 'react';
import { formatTime } from '@/lib/formatDate';
import { useUserInfoStore } from '@/store/UserInfoStore';
import { ChatInfo } from '@/type/sessionType';

interface MessageProps {
  chat: ChatInfo;
}

function Message({ chat }: MessageProps) {
  const id = useUserInfoStore((state) => state.id);
  return (
    <div className={`${chat.header ? 'mt-6' : 'mt-1'} mx-3 px-4 text-[13px] text-[#202124]`}>
      {chat.header && (
        <div className='flex items-center gap-2'>
          <p className='max-w-56 truncate font-bold'>{chat.userId === id ? '나' : chat.userName}</p>
          <p className='text-xs text-[#5F6368]'>{formatTime(chat.date)}</p>
        </div>
      )}
      <div className='mt-1'>{chat.content}</div>
    </div>
  );
}

export const ChatMessage = memo(Message);
