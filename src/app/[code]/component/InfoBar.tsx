'use client';

import { ReactNode } from 'react';

import * as Icon from '@/asset/icon';
import { PanelType } from '@/type/panelType';
import { IconButton } from './part/InfoBar';

interface ButtonType {
  type: PanelType;
  icon: ReactNode;
  clickedIcon: ReactNode;
  name: string;
  align?: 'right';
}

const ICON_OFF_PROPS = {
  width: 24,
  height: 24,
  fill: '#ffffff',
};

const ICON_ON_PROPS = {
  width: 24,
  height: 24,
  fill: '#A8C7FA',
};

const BUTTON_LIST: ButtonType[] = [
  {
    type: 'INFO',
    icon: <Icon.InfoOff {...ICON_OFF_PROPS} />,
    clickedIcon: <Icon.InfoOn {...ICON_ON_PROPS} />,
    name: '회의 세부정보',
  },
  {
    type: 'USER',
    icon: <Icon.UserOff {...ICON_OFF_PROPS} />,
    clickedIcon: <Icon.UserOn {...ICON_ON_PROPS} />,
    name: '사용자',
  },
  {
    type: 'CHAT',
    icon: <Icon.ChatOff {...ICON_OFF_PROPS} />,
    clickedIcon: <Icon.ChatOn {...ICON_ON_PROPS} />,
    name: '모든 사용자와 채팅',
  },
  /* {
    type: 'ACTIVE',
    icon: <Icon.ActiveOff {...ICON_OFF_PROPS} />,
    clickedIcon: <Icon.ActiveOn {...ICON_ON_PROPS} />,
    name: '활동',
  },
  {
    type: 'HOST',
    icon: <Icon.HostCtrlOff {...ICON_OFF_PROPS} />,
    clickedIcon: <Icon.HostCtrlOn {...ICON_ON_PROPS} />,
    name: '호스트 제어 기능',
    align: 'right',
  }, */
];

export default function InfoBar() {
  return (
    <div className='flex items-center justify-end'>
      {BUTTON_LIST.map((button, i) => (
        <IconButton key={button.type} align={i === BUTTON_LIST.length - 1 ? 'right' : 'center'} {...button} />
      ))}
    </div>
  );
}
