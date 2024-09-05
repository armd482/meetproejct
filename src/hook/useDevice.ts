import { useDeviceStore } from '@/store/DeviceStore';
import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export const useDevice = () => {
  const streamRef = useRef<MediaStream | null>(null);

  const [videoInputList, setVideoInputList] = useState<MediaDeviceInfo[]>([]);
  const [audioOutputList, setAudioOutputList] = useState<MediaDeviceInfo[]>([]);
  const [audioInputList, setAudioInputList] = useState<MediaDeviceInfo[]>([]);

  const { setAudioInputId, setAudioOutputId, setVideoInputId } = useDeviceStore(
    useShallow((state) => ({
      audioInputId: state.audioInputId,
      audioOutputId: state.audioOutputId,
      videoInputId: state.videoInputId,
      setAudioInputId: state.setAudioInputId,
      setAudioOutputId: state.setAudioOutputId,
      setVideoInputId: state.setVideoInputId,
    })),
  );

  const handleAudioInputChange = (value: string) => {
    setAudioInputId(value);
  };

  const handleAudioOutputChange = (value: string) => {
    setAudioOutputId(value);
  };

  const handleVideoInputChange = (value: string) => {
    setVideoInputId(value);
  };

  const setStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    streamRef.current = stream;

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
    setVideoInputId(stream.getVideoTracks()[0].getSettings().deviceId ?? '');
    setAudioInputId(stream.getAudioTracks()[0].getSettings().deviceId ?? '');
    setAudioOutputId(audioOutput.length > 0 ? audioOutput[0].deviceId : '');
  };

  const toggleVideoInput = async (value: boolean) => {
    const stream = streamRef.current;
    if (stream) {
      if (value) {
        await setStream();
        return;
      }
      stream.getVideoTracks().forEach((track) => track.stop());
    }
  };

  const toggleAudioInput = (value: boolean) => {
    const stream = streamRef.current;
    if (stream) {
      stream.getAudioTracks().forEach((track) => (track.enabled = value));
    }
  };

  useEffect(() => {
    setStream();
    navigator.mediaDevices.ondevicechange = () => {
      setStream();
    };
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      navigator.mediaDevices.ondevicechange = null;
    };
  }, []);
  return {
    streamRef,
    videoInputList,
    audioOutputList,
    audioInputList,
    handleAudioInputChange,
    handleAudioOutputChange,
    handleVideoInputChange,
    toggleVideoInput,
    toggleAudioInput,
  };
};
