'use client';

import { useContext } from 'react';
import { ToggleContext } from '@/context/ToggleContext';
import { Caption, Emoji } from './part/Toggle';

export default function Toggle() {
  const { toggleStatus } = useContext(ToggleContext);
  return (
    <div>
      {toggleStatus.caption && <Caption />}
      {toggleStatus.emoji && <Emoji />}
    </div>
  );
}
