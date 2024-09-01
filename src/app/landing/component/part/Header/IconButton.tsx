import { ButtonTag } from '@/component';
import { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  name: string;
}

export default function IconButton({ children, name }: IconButtonProps) {
  return (
    <ButtonTag name={name} position='bottom'>
      <button
        type='button'
        className='rounded-full p-3 transition duration-200 ease-in-out hover:bg-gray-100'
      >
        {children}
      </button>
    </ButtonTag>
  );
}
