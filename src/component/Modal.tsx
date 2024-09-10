'use client';

import { useOutsideClick } from '@/hook';
import { PropsWithChildren, useState, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onCloseModal: () => void;
}

function ModalPortal({ children }: PropsWithChildren) {
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById('modal'));
  }, []);

  if (!portalElement) {
    return null;
  }

  return ReactDOM.createPortal(children, portalElement) as JSX.Element;
}

export default function Modal({ isOpen, onCloseModal, children }: ModalProps) {
  const { targetRef } = useOutsideClick<HTMLDivElement>(onCloseModal);
  if (!isOpen) {
    return null;
  }

  return (
    <ModalPortal>
      <div
        className='fixed z-[2101] flex h-screen w-screen items-center justify-center'
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}
      >
        <div ref={targetRef}>{children}</div>
      </div>
    </ModalPortal>
  );
}
