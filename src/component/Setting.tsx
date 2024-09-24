import useCheckPermission from '@/hook/useCheckPermission';
import { useEffect, useState, useRef } from 'react';
import { useDeviceStore } from '@/store/DeviceStore';
import { useShallow } from 'zustand/react/shallow';
import { useDevice } from '@/hook';
import * as Icon from '@/asset/icon';
import Modal from './Modal';
import RequestModal from './RequestModal';
import InitialRequestModal from './InitialRequestModal';

interface SettingProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SettingModalProps {
  onClose: () => void;
}

type Category = 'audio' | 'video' | 'general';

interface CategoryButtonType {
  name: string;
  value: Category;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const CATEGORY_BUTTON: CategoryButtonType[] = [
  {
    name: '오디오',
    value: 'audio',
    icon: Icon.Speaker,
  },
  {
    name: '비디오',
    value: 'video',
    icon: Icon.VideoOn,
  },
  {
    name: '일반설정',
    value: 'general',
    icon: Icon.Setting,
  },
];

function SettingModal({ onClose }: SettingModalProps) {
  const [category, setCategory] = useState<Category>('audio');

  const handleCategoryButtonClick = (value: Category) => {
    setCategory(value);
  };

  const handleDeleteButtonClick = () => {
    onClose();
  };
  return (
    <div className='flex relative h-[650px] w-[800px] bg-white font-googleSans rounded-lg overflow-hidden'>
      <div className='h-full w-[256px] border-r border-solid border-[#DADCE0] md:w-20'>
        <h1 className='px-6 pt-6 text-1.5xl text-[#202124] md:hidden'>설정</h1>
        <div className='mr-2 mt-6'>
          {CATEGORY_BUTTON.map((categoryButton) => {
            const IconComponent = categoryButton.icon;
            return (
              <button
                type='button'
                key={categoryButton.value}
                onClick={() => handleCategoryButtonClick(categoryButton.value)}
                className={`relative group flex h-12 w-full items-center gap-3 rounded-r-full ${category === categoryButton.value ? 'z-10 bg-[#E8F0FE] hover:shadow-md' : 'bg-white hover:bg-[#F9F9F9]'} px-6`}
              >
                <IconComponent
                  width={24}
                  height={24}
                  fill={category === categoryButton.value ? '#1967D2' : '#5F6368'}
                  className={`group-hover:${category === categoryButton.value ? 'fill-[#174FA7]' : 'fill-[#232427]'}`}
                />
                <p
                  className={`${
                    category === categoryButton.value
                      ? 'text-[#1967D2] group-hover:text-[#174EA6]'
                      : 'text-[#5F6368] group-hover:text-[#202124]'
                  }`}
                >
                  {categoryButton.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>
      <button
        type='button'
        onClick={handleDeleteButtonClick}
        className='flex size-12 absolute right-3 top-[9px] items-center justify-center rounded-full hover:bg-[#F9F9F9] active:bg-[#E6E7E7]'
      >
        <Icon.Delete width={24} height={24} fill='#5F6368' />
      </button>
      <div className='w-[544px] pt-[60px] m-6'>test</div>
    </div>
  );
}

export default function Setting({ isOpen, onClose }: SettingProps) {
  const { stream, handleUpdateStream } = useDevice(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { permission, setPermission } = useDeviceStore(
    useShallow((state) => ({
      permission: state.permission,
      setPermission: state.setPermission,
    })),
  );
  const { isSupportedPermission, checkPermissionQuery, updatePermission } = useCheckPermission();
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [isAllow, setIsAllow] = useState(false);
  const [isSkipPermission, setIsSkipPermission] = useState(false);

  useEffect(() => {
    const getPermission = async () => {
      const newPermission = await checkPermissionQuery();
      if (newPermission !== null) {
        setIsTimeOut(true);
      }
    };
    getPermission();
  }, [checkPermissionQuery]);

  const handleModalClose = () => {
    if (isOpen && !permission && !isSkipPermission) {
      return;
    }
    onClose();
    setIsSkipPermission(false);
  };

  useEffect(() => {
    if (isOpen && !isSupportedPermission) {
      setIsTimeOut(false);
      setPermission(null);
      setIsAllow(false);
      timerRef.current = setTimeout(() => {
        setIsTimeOut(true);
        timerRef.current = null;
      }, 2000);
      updatePermission();
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isOpen, updatePermission, isSupportedPermission, setPermission]);

  useEffect(() => {
    if (isSupportedPermission && !permission) {
      return;
    }
    if (isOpen && !isSkipPermission) {
      handleUpdateStream();
    }
  }, [isOpen, isSupportedPermission, permission, isSkipPermission, handleUpdateStream]);

  const handleUpdateStreamButtonClick = () => {
    handleUpdateStream();
    setIsAllow(true);
  };

  const handleRequestModalClose = () => {
    setIsSkipPermission(true);
  };

  useEffect(() => {
    if (!isOpen && stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  }, [isOpen, stream]);

  return (
    <Modal isOpen={isOpen && isTimeOut} onCloseModal={handleModalClose}>
      {isSupportedPermission && !permission && !isSkipPermission ? (
        isAllow ? (
          <InitialRequestModal />
        ) : (
          <RequestModal onUpdateStream={handleUpdateStreamButtonClick} onClose={handleRequestModalClose} />
        )
      ) : (
        <SettingModal onClose={onClose} />
      )}
    </Modal>
  );
}
