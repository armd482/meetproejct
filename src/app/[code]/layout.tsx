'use client';

import { PropsWithChildren } from 'react';
import { PanelContextProvider, ToggleContextProvider, UserInfoContextProvider } from '@/context';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <PanelContextProvider>
      <ToggleContextProvider>
        <UserInfoContextProvider>{children}</UserInfoContextProvider>
      </ToggleContextProvider>
    </PanelContextProvider>
  );
}
