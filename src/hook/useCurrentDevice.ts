import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { getCurrentDeviceInfo } from '@/lib/getCurrentDeviceInfo';
import { useDeviceStore } from '@/store/DeviceStore';

const useCurrentDevice = () => {
  const {
    setAudioInput,
    setAudioOutput,
    setVideoInput,
    setAudioInputList,
    setAudioOutputList,
    setVideoInputList,
    permission,
  } = useDeviceStore(
    useShallow((state) => ({
      setAudioInput: state.setAudioInput,
      setAudioOutput: state.setAudioOutput,
      setVideoInput: state.setVideoInput,
      setAudioInputList: state.setAudioInputList,
      setAudioOutputList: state.setAudioOutputList,
      setVideoInputList: state.setVideoInputList,
      permission: state.permission,
    })),
  );

  const updateDevice = useCallback(
    async (stream: MediaStream | null) => {
      if (!stream) {
        return;
      }

      const deviceInfo = await getCurrentDeviceInfo(stream);

      setVideoInput(deviceInfo.currentVideoInput ?? deviceInfo.currentVideoInputList[0]);
      setVideoInputList(deviceInfo.currentVideoInputList);

      setAudioInput(deviceInfo.currentAudioInput ?? deviceInfo.currentAudioInputList[0]);
      setAudioInputList(deviceInfo.currentAudioInputList);

      const currentAudioOutput =
        deviceInfo.currentAudioOutput ??
        (permission?.audio ? { name: '시스템 오디오', id: '0' } : { id: '', name: '' });

      setAudioOutput(currentAudioOutput);
      setAudioOutputList(deviceInfo.currentAudioOutputList);
    },
    [
      setAudioInput,
      setAudioOutput,
      setVideoInput,
      setAudioInputList,
      setAudioOutputList,
      setVideoInputList,
      permission,
    ],
  );

  return { updateDevice };
};

export default useCurrentDevice;
