'use client';

import { useContext } from 'react';
import { ToggleContext } from '@/context/ToggleContext';
import { EmojiType } from '@/type/toggleType';
import { Caption, Emoji } from './part/Toggle';

interface ToggleProps {
  onClickEmojiButton: (value: EmojiType) => void;
}

export default function Toggle({ onClickEmojiButton }: ToggleProps) {
  const { toggleStatus } = useContext(ToggleContext);
  return (
    <div>
      {toggleStatus.caption && <Caption />}
      {toggleStatus.emoji && <Emoji onClickEmojiButton={onClickEmojiButton} />}
    </div>
  );
}
