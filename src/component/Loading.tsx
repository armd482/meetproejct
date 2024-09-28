import Image from 'next/image';
import * as image from '@/asset/image';

interface LoadingProps {
  isPending: boolean;
}

export default function Loading({ isPending }: LoadingProps) {
  if (!isPending) {
    return null;
  }
  return (
    <div
      className='fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center'
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
    >
      <Image alt='loading' src={image.loading} width={24} height={24} className='animate-spin' />
    </div>
  );
}
