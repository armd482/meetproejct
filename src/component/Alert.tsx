'use client';

import { PropsWithChildren, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface AlertProps {
  text: string;
  isOpen: boolean;
  onCloseAlert: () => void;
  interval?: number;
}

function AlertPortal({ children }: PropsWithChildren) {
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById('alert'));
  }, []);

  if (!portalElement) {
    return null;
  }

  return ReactDOM.createPortal(children, portalElement) as JSX.Element;
}

export default function Alert({ text, isOpen, onCloseAlert, interval = 4000 }: AlertProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        onCloseAlert();
        timerRef.current = null;
      }, interval);
    }
  }, [isOpen, interval, onCloseAlert]);

  if (!isOpen) {
    return null;
  }

  return (
    <AlertPortal>
      <div
        className='fixed bottom-28 left-6 z-[2101] w-[312px] rounded bg-[#3C4043] px-4 py-[14px] text-[#E8EAED]'
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px',
        }}
      >
        {text}
      </div>
    </AlertPortal>
  );
}
