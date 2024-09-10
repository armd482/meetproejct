'use client';

import { useContext } from 'react';
import { UserInfoContext } from '@/context/userInfoContext';
import Meetting from './Meeting';
import Setting from './Setting';

export default function Provider() {
  const { name } = useContext(UserInfoContext);

  return name ? <Meetting /> : <Setting />;
}
