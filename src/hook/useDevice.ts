import { getCurrentDeviceInfo } from '@/lib/getCurrentDeviceInfo';
import { useDeviceStore } from '@/store/DeviceStore';
import { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

const useDevice = () => {
  const { deviceEnable, audioInput, videoInput, setAudioInput, setAudioOutput, setVideoInput, setDeviceEnable } =
    useDeviceStore(
      useShallow((state) => ({
        deviceEnable: state.deviceEnable,
        audioInput: state.audioInput,
        videoInput: state.videoInput,
        setAudioInput: state.setAudioInput,
        setAudioOutput: state.setAudioOutput,
        setVideoInput: state.setVideoInput,
        setDeviceEnable: state.setDeviceEnable,
      })),
    );

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isPendingStream, setIsPendingStream] = useState(false);
  const [isGetStream, setIsGetStream] = useState<boolean>(true);

  const [videoInputList, setVideoInputList] = useState<MediaDeviceInfo[]>([]);
  const [audioOutputList, setAudioOutputList] = useState<MediaDeviceInfo[]>([]);
  const [audioInputList, setAudioInputList] = useState<MediaDeviceInfo[]>([]);

  const handleAudioInputChange = (value: Record<'id' | 'name', string>) => {
    setAudioInput(value);
  };

  const handleAudioOutputChange = (value: Record<'id' | 'name', string>) => {
    setAudioOutput(value);
  };

  const handleVideoInputChange = (value: Record<'id' | 'name', string>) => {
    setVideoInput(value);
  };

  const getStream = useCallback(async () => {
    const startDate = new Date().getTime();
    if (deviceEnable.video) {
      setIsPendingStream(true);
    }

    const newStream = await navigator.mediaDevices.getUserMedia({
      audio: audioInput.id
        ? {
            deviceId: audioInput.id,
            ...AUDIO_CONSTRAINT,
          }
        : AUDIO_CONSTRAINT,
      video: videoInput.id ? { deviceId: videoInput.id } : true,
    });

    if (!deviceEnable.mic) {
      newStream.getAudioTracks().forEach((track) => {
        track.enabled = deviceEnable.mic;
      });
    }

    if (!deviceEnable.video) {
      newStream.getVideoTracks().forEach((track) => {
        track.stop();
      });
    }

    setStream(newStream);
    const timeDiff = new Date().getTime() - startDate;
    setTimeout(
      () => {
        setIsPendingStream(false);
      },
      Math.max(1000 - timeDiff, 0),
    );

    const deviceInfo = await getCurrentDeviceInfo(newStream);

    setVideoInputList(deviceInfo.currentVideoInputList);
    setAudioInputList(deviceInfo.currentAudioInputList);
    setAudioOutputList(deviceInfo.currentAudioOutputList);

    setAudioInput(deviceInfo.currentAudioInput);
    setAudioOutput(deviceInfo.currentAudioOutput);
    setVideoInput(deviceInfo.currentVideoInput);
  }, [setVideoInput, setAudioInput, setAudioOutput, audioInput, videoInput, deviceEnable]);

  const toggleVideoInput = async () => {
    if (stream) {
      setDeviceEnable((prev) => {
        if (prev.video) {
          stream.getVideoTracks().forEach((track) => {
            track.stop();
          });
        } else {
          setIsGetStream(true);
        }
        return { ...prev, video: !prev.video };
      });
    }
  };

  const toggleAudioInput = async () => {
    if (stream) {
      setDeviceEnable((prev) => {
        const newValue = !prev.mic;
        stream.getAudioTracks().forEach((track) => {
          track.enabled = newValue;
        });
        return { ...prev, mic: newValue };
      });
    }
  };

  useEffect(() => {
    if (isGetStream) {
      getStream();
    }
    setIsGetStream(false);
  }, [getStream, isGetStream, deviceEnable, stream]);

  useEffect(() => {
    navigator.mediaDevices.ondevicechange = () => {
      getStream();
    };
    return () => {
      navigator.mediaDevices.ondevicechange = null;
    };
  }, [deviceEnable, getStream]);

  return {
    stream,
    videoInputList,
    audioOutputList,
    audioInputList,
    isPendingStream,
    handleAudioInputChange,
    handleAudioOutputChange,
    handleVideoInputChange,
    toggleVideoInput,
    toggleAudioInput,
  };
};

export default useDevice;
