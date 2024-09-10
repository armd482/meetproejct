'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Modal, ButtonTag } from '@/component';
import { permissionCommon, permission, permissionRequest } from '@/asset/image';

import * as Icon from '@/asset/icon';
import { useDeviceStore } from '@/store/DeviceStore';
import { useShallow } from 'zustand/react/shallow';

interface PermissionModalProps {
  isOpenModal: boolean;
  onClose: () => void;
  onUpdateStream: () => void;
}

export default function PermissionModal({ isOpenModal, onClose, onUpdateStream }: PermissionModalProps) {
  const [isDenied, setIsDenied] = useState(false);

  const {
    permission: devicePermission,
    setPermission,
    setDeviceEnable,
  } = useDeviceStore(
    useShallow((state) => ({
      permission: state.permission,
      setPermission: state.setPermission,
      setDeviceEnable: state.setDeviceEnable,
    })),
  );

  const handleRequestPermissionButtonClick = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setPermission({ audio: true, video: true });
      setDeviceEnable({ mic: true, video: true });
      onUpdateStream();
      onClose();
    } catch {
      setIsDenied(true);
    }
  };

  const handleOutsideModalClick = () => {
    if (permission) {
      onClose();
    }
  };
  return (
    <Modal isOpen={isOpenModal || !devicePermission} onCloseModal={handleOutsideModalClick}>
      {!devicePermission ? (
        <div className='px-8 pt-[30px] pb-10 bg-white rounded-[28px]'>
          <div className='flex w-full items-center justify-center'>
            <Image src={permissionRequest} alt='허용 클릭' width={230} height={230} />
          </div>
          <div className='pt-5 px-10 text-[#444746] font-googleSans'>
            <h1 className='mb-4 text-2xl'>
              <span className='font-semibold'>허용</span> 클릭
            </h1>
            <p>회의 중에 언제든지 마이크 및 카메라를 끌 수 있습니다</p>
          </div>
        </div>
      ) : !isDenied ? (
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
      ) : (
        <div className='relative flex w-full max-w-[789px] items-center rounded-[28px] bg-white px-8 pb-10 pt-[30px] lg:flex-col'>
          <div className='absolute right-2 top-2 rounded-full hover:bg-[#F0F1F1] active:bg-[#DEDFDF]'>
            <ButtonTag position='bottom' name='대화상자 닫기'>
              <button type='button' onClick={onClose} className='flex  size-12 items-center justify-center'>
                <Icon.Delete width={24} height={24} fill='#444746' />
              </button>
            </ButtonTag>
          </div>
          <Image src={permissionCommon} alt='permission' className='size-[322.5px] lg:size-[175px]' />
          <div className='px-10 pt-5 font-googleSans'>
            <h1 className='mb-[15px] text-left text-[22px] text-[#444746]'>Meet에서 마이크 및 카메라 사용이 차단됨</h1>
            <ol className='list-decimal'>
              <li>
                <span className='inline'>
                  브라우저의 주소 표시줄에서
                  <span className='mx-1 inline-block align-middle'>
                    <Icon.PermissionSetting width={25} height={25} />
                  </span>
                  설정 아이콘을 클릭합니다.
                </span>
              </li>
              <li className='my-[15px]'>
                <span className='inline'>차단된 마이크 및 카메라 권한을 허용합니다.</span>
              </li>
            </ol>
          </div>
        </div>
      )}
    </Modal>
  );
}
