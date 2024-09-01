'use client';

import { ReactNode } from 'react';

import {
  ActiveOffIcon,
  ActiveOnIcon,
  ChatOffIcon,
  ChatOnIcon,
  HostCtrlOffIcon,
  HostCtrlOnIcon,
  InfoOffIcon,
  InfoOnIcon,
  UserOffIcon,
  UserOnIcon,
} from '@/asset';
import { PanelType } from '@/type/panelType';
import { IconButton } from './part/InfoBar';

interface ButtonType {
  type: PanelType;
  icon: ReactNode;
  clickedIcon: ReactNode;
}
const ICON_PROPS = {
  width: 24,
  height: 24,
};

const ICON_OFF_PROPS = {
  ...ICON_PROPS,
  fill: '#ffffff',
};

const ICON_ON_PROPS = {
  ...ICON_PROPS,
  fill: '#A8C7FA',
};

const BUTTON_LIST: ButtonType[] = [
  {
    type: 'INFO',
    icon: <InfoOffIcon {...ICON_OFF_PROPS} />,
    clickedIcon: <InfoOnIcon {...ICON_ON_PROPS} />,
  },
  {
    type: 'USER',
    icon: <UserOffIcon {...ICON_OFF_PROPS} />,
    clickedIcon: <UserOnIcon {...ICON_ON_PROPS} />,
  },
  {
    type: 'CHAT',
    icon: <ChatOffIcon {...ICON_OFF_PROPS} />,
    clickedIcon: <ChatOnIcon {...ICON_ON_PROPS} />,
  },
  {
    type: 'ACTIVE',
    icon: <ActiveOffIcon {...ICON_OFF_PROPS} />,
    clickedIcon: <ActiveOnIcon {...ICON_ON_PROPS} />,
  },
  {
    type: 'HOST',
    icon: <HostCtrlOffIcon {...ICON_OFF_PROPS} />,
    clickedIcon: <HostCtrlOnIcon {...ICON_ON_PROPS} />,
  },
];

export default function InfoBar() {
  return (
    <div className='absolute right-5 top-1/2 flex -translate-y-1/2 items-center'>
      {BUTTON_LIST.map((button) => (
        <IconButton key={button.type} {...button} />
      ))}
    </div>
  );
}
