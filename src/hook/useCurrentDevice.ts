import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { getCurrentDeviceInfo } from '@/lib/getCurrentDeviceInfo';
import { useDeviceStore } from '@/store/DeviceStore';

const useCurrentDevice = () => {
  const { setAudioInput, setAudioOutput, setVideoInput, setAudioInputList, setAudioOutputList, setVideoInputList } =
    useDeviceStore(
      useShallow((state) => ({
        setAudioInput: state.setAudioInput,
        setAudioOutput: state.setAudioOutput,
        setVideoInput: state.setVideoInput,
        setAudioInputList: state.setAudioInputList,
        setAudioOutputList: state.setAudioOutputList,
        setVideoInputList: state.setVideoInputList,
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

      setAudioOutput(deviceInfo.currentAudioOutput ?? deviceInfo.currentAudioOutputList[0]);
      setAudioOutputList(deviceInfo.currentAudioOutputList);
    },
    [setAudioInput, setAudioOutput, setVideoInput, setAudioInputList, setAudioOutputList, setVideoInputList],
  );

  return { updateDevice };
};

export default useCurrentDevice;
