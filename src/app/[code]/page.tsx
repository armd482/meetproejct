'use client';

import { useContext } from 'react';
import { redirect } from 'next/navigation';

import { checkKey } from '@/lib/checkKey';
import { UserInfoContext } from '@/context/userInfoContext';
import Meetting from './Meeting';
import Setting from './Setting';

interface MeetingPageProps {
  params: Record<string, string>;
}

export default function Page({ params }: MeetingPageProps) {
  const { code } = params;
  const { name } = useContext(UserInfoContext);
  if (!checkKey(code)) {
    redirect('/landing');
  }

  return name ? <Meetting /> : <Setting />;
}
