import Image from 'next/image';
import { MouseEvent } from 'react';
import { permission } from '@/asset/image';

interface RequestModalProps {
  onUpdateStream?: () => void;
  onSkipUpdateStream?: () => void;
  onRequstError?: () => void;
}

export default function RequestModal({ onSkipUpdateStream, onRequstError, onUpdateStream }: RequestModalProps) {
  const handleRequestPermissionButtonClick = async () => {
    try {
      if (onUpdateStream) {
        onUpdateStream();
      }
    } catch {
      if (onRequstError) {
        onRequstError();
      }
    }
  };

  const handleWithoutRequestButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onSkipUpdateStream) {
      onSkipUpdateStream();
    }
  };

  return (
    <div className='relative flex flex-col items-center justify-center rounded-[28px] bg-white px-8 pb-[40px] pt-[30px]'>
      <Image src={permission} alt='permission' width={230} height={230} />
      <div className='px-10 pt-5 text-center font-googleSans text-[#444746]'>
        <p className='mb-4 text-2xl'>회의에서 참여자들이 나를 보고 듣도록 하시겠습니까?</p>
        <p className='text-sm'>회의 중에 언제든지 마이크 및 카메라를 끌 수 있습니다</p>
      </div>
      <div className='mb-4 mt-[35px] flex flex-col items-center gap-4 px-3 py-1'>
        <button
          type='button'
          onClick={handleRequestPermissionButtonClick}
          className='h-11 rounded-3xl bg-[#0B57D0] px-10 text-sm text-white hover:bg-[#1F64D4]'
        >
          마이크 및 카메라 허용
        </button>
        <button
          type='button'
          className='w-[191px] rounded-full py-2 text-sm text-[#0B57D0] hover:bg-[#ECF2FC] active:bg-[#D5E2F8]'
          onClick={handleWithoutRequestButtonClick}
        >
          마이크 및 카메라 없이 계속
        </button>
      </div>
    </div>
  );
}
