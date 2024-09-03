'use client';

import { PropsWithChildren } from 'react';
import { PanelContextProvider } from '@/context';
import { ToggleContextProvider } from '@/context/ToggleContext';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <PanelContextProvider>
      <ToggleContextProvider>{children}</ToggleContextProvider>
    </PanelContextProvider>
  );
}
