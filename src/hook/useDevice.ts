import { useDeviceStore } from '@/store/DeviceStore';
import { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export const useDevice = () => {
  const {
    deviceEnable,
    setAudioInputId,
    setAudioOutputId,
    setVideoInputId,
    setDeviceEnable,
  } = useDeviceStore(
    useShallow((state) => ({
      deviceEnable: state.deviceEnable,
      setAudioInputId: state.setAudioInputId,
      setAudioOutputId: state.setAudioOutputId,
      setVideoInputId: state.setVideoInputId,
      setDeviceEnable: state.setDeviceEnable,
    })),
  );

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isPendingStream, setIsPendingStream] = useState(false);

  const [videoInputList, setVideoInputList] = useState<MediaDeviceInfo[]>([]);
  const [audioOutputList, setAudioOutputList] = useState<MediaDeviceInfo[]>([]);
  const [audioInputList, setAudioInputList] = useState<MediaDeviceInfo[]>([]);

  const [enable, setEnable] = useState({
    video: deviceEnable.video,
    mic: deviceEnable.mic,
  });

  const handleAudioInputChange = (value: string) => {
    setAudioInputId(value);
  };

  const handleAudioOutputChange = (value: string) => {
    setAudioOutputId(value);
  };

  const handleVideoInputChange = (value: string) => {
    setVideoInputId(value);
  };

  const getStream = useCallback(
    async (video: boolean, audio: boolean) => {
      const startDate = new Date().getTime();
      setIsPendingStream(true);
      const newStream = await navigator.mediaDevices.getUserMedia({
        video,
        audio,
      });
      setStream(newStream);
      const timeDiff = new Date().getTime() - startDate;
      setTimeout(
        () => {
          setIsPendingStream(false);
        },
        Math.max(1000 - timeDiff, 0),
      );

      const deviceInfo = await navigator.mediaDevices.enumerateDevices();
      setVideoInputList(
        deviceInfo.filter((device) => device.kind === 'videoinput'),
      );
      setAudioOutputList(
        deviceInfo.filter((device) => device.kind === 'audiooutput'),
      );
      setAudioInputList(
        deviceInfo.filter((device) => device.kind === 'audioinput'),
      );

      const audioOutput = deviceInfo.filter(
        (device) => device.kind === 'audiooutput',
      );
      setVideoInputId(
        newStream.getVideoTracks()[0]?.getSettings().deviceId ?? '',
      );
      setAudioInputId(
        newStream.getAudioTracks()[0]?.getSettings().deviceId ?? '',
      );
      setAudioOutputId(audioOutput.length > 0 ? audioOutput[0].deviceId : '');
    },
    [setVideoInputId, setAudioInputId, setAudioOutputId],
  );

  const toggleVideoInput = async () => {
    if (stream) {
      setEnable((prev) => {
        const newValue = !prev.video;
        if (newValue) {
          getStream(true, prev.mic);
        } else {
          stream.getVideoTracks().forEach((track) => track.stop());
        }
        return { ...prev, video: newValue };
      });
    }
  };

  const toggleAudioInput = async () => {
    if (stream) {
      setEnable((prev) => {
        const newValue = !prev.mic;
        stream.getAudioTracks().forEach((track) => {
          track.enabled = newValue;
        });
        return { ...prev, mic: newValue };
      });
    }
  };

  useEffect(() => {
    setDeviceEnable(enable);
  }, [enable, setDeviceEnable]);

  useEffect(() => {
    getStream(true, true);
  }, [getStream]);

  useEffect(() => {
    navigator.mediaDevices.ondevicechange = () => {
      getStream(deviceEnable.video, deviceEnable.mic);
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
