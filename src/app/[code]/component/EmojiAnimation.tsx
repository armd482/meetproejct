'use client';

import { useUserInfoStore } from '@/store/UserInfoStore';
import { EmojiInfo } from '@/type/sessionType';
import { memo, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useShallow } from 'zustand/react/shallow';

import * as webp from '@/asset/webp';
import { EmojiType } from '@/type/toggleType';

interface EmojiAnimationProps {
  emoji: EmojiInfo;
  maxWidth: number;
  deleteEmoji: (emojiId: string) => void;
}

const EMOJI_IMAGE: Record<EmojiType, StaticImageData> = {
  clap: webp.clapEmoji,
  curious: webp.curiousEmoji,
  heart: webp.heartEmoji,
  laughter: webp.laughterEmoji,
  partyPoper: webp.partyPoperEmoji,
  sad: webp.sadEmoji,
  surprice: webp.surpriceEmoji,
  thumbDown: webp.thumbDownEmoji,
  thumbUp: webp.thumbUpEmoji,
};

function EmojiIcon({ emoji, maxWidth, deleteEmoji }: EmojiAnimationProps) {
  const { id } = useUserInfoStore(
    useShallow((state) => ({
      id: state.id,
    })),
  );
  useEffect(() => {
    setTimeout(() => {
      deleteEmoji(emoji.id);
    }, 3000);
  }, [emoji, deleteEmoji]);
  return (
    <div
      className='absolute bottom-0 flex animate-move-bottom-up flex-col items-center justify-center gap-2'
      style={{ left: `${Math.random() * Math.min(Math.max(maxWidth - 36, 0), 250)}px` }}
    >
      <Image src={EMOJI_IMAGE[emoji.emojiType]} width={36} height={36} alt={emoji.emojiType} />
      <div
        className={`max-w-28 truncate rounded-full px-2 text-sm ${emoji.userId === id ? 'bg-[#8AB4F8] text-[#48525F]' : 'bg-[#202124] text-white'} `}
      >
        {id === emoji.userId ? '나' : emoji.userName}
      </div>
    </div>
  );
}

const EmojiAnimation = memo(EmojiIcon);

export default EmojiAnimation;
