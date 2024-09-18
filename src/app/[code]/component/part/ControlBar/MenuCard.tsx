import { ReactNode } from 'react';

interface MenuCardProps {
  icon: ReactNode;
  name: string;
  onClick?: () => void;
}

export default function MenuCard({ icon, name, onClick }: MenuCardProps) {
  return (
    <button
      type='button'
      className='flex h-12 w-full items-center gap-4 px-3 py-2 hover:bg-[#2E2F2F] active:bg-[#444545]'
      onClick={onClick}
    >
      {icon}
      <p className='text-base text-[#E3E3E3]'>{name}</p>
    </button>
  );
}
