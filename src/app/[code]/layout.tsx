'use client';

import { PropsWithChildren } from 'react';
import { PanelContextProvider } from '@/context';

export default function Layout({ children }: PropsWithChildren) {
  return <PanelContextProvider>{children}</PanelContextProvider>;
}
