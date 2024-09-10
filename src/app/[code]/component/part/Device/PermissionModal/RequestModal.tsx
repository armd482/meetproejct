import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';

import { useDeviceStore } from '@/store/DeviceStore';
import { ButtonTag } from '@/component';
import * as Icon from '@/asset/icon';
import { permission } from '@/asset/image';

interface RequestModalProps {
  onUpdateStream: () => void;
  onClose: () => void;
  onRequstError: () => void;
}

export default function RequestModal({ onClose, onRequstError, onUpdateStream }: RequestModalProps) {
  const { setPermission } = useDeviceStore(
    useShallow((state) => ({
      setPermission: state.setPermission,
    })),
  );
  const handleRequestPermissionButtonClick = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setPermission({ audio: true, video: true });
      onUpdateStream();
      onClose();
    } catch {
      onRequstError();
    }
  };

  return (
    <div className='relative flex flex-col items-center justify-center rounded-[28px] bg-white px-8 pb-[40px] pt-[30px]'>
      <div className='absolute right-2 top-2 rounded-full hover:bg-[#F0F1F1] active:bg-[#DEDFDF]'>
        <ButtonTag position='bottom' name='대화상자 닫기'>
          <button type='button' onClick={onClose} className='flex  size-12 items-center justify-center'>
            <Icon.Delete width={24} height={24} fill='#444746' />
          </button>
        </ButtonTag>
      </div>
      <Image src={permission} alt='permission' width={230} height={230} />
      <div className='px-10 pt-5 text-center font-googleSans text-[#444746]'>
        <p className='mb-4 text-2xl'>회의에서 참여자들이 나를 보고 듣도록 하시겠습니까?</p>
        <p className='text-sm'>회의 중에 언제든지 마이크 및 카메라를 끌 수 있습니다</p>
      </div>
      <div className='mb-4 mt-[35px] px-3 py-1'>
        <button
          type='button'
          onClick={handleRequestPermissionButtonClick}
          className='h-11 rounded-3xl bg-[#0B57D0] px-10 text-sm text-white hover:bg-[#1F64D4]'
        >
          마이크 및 카메라 사용
        </button>
      </div>
    </div>
  );
}
