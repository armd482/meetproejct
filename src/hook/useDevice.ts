'use client';

import { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { StreamStatusType } from '@/type/streamType';
import { useDeviceStore } from '@/store/DeviceStore';
import { AUDIO_CONSTRAINT } from '@/asset/constant/stream';
import { getCurrentDeviceInfo } from '@/lib/getCurrentDeviceInfo';

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
  const [streamStatus, setStreamStatus] = useState<StreamStatusType>('none');
  const [isUpdateStream, setIsUpdateStream] = useState<boolean>(true);

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

  const toggleVideoInput = async () => {
    if (stream && videoInputList.length !== 0) {
      setDeviceEnable((prev) => {
        if (prev.video) {
          stream.getVideoTracks().forEach((track) => {
            track.stop();
          });
          setStreamStatus('pause');
        } else {
          setIsUpdateStream(true);
        }
        return { ...prev, video: !prev.video };
      });
    }
  };

  const getStream = useCallback(async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: audioInput.id ? { deviceId: audioInput.id, ...AUDIO_CONSTRAINT } : { ...AUDIO_CONSTRAINT },
        video: videoInput.id ? { deviceId: videoInput.id } : true,
      });
      return newStream;
    } catch (error) {
      const e = error as DOMException;
      if (e.name === 'NotAllowedError') {
        return 'rejected';
      }

      if (e.name === 'NotReadableError') {
        try {
          const s = await navigator.mediaDevices.getUserMedia({
            audio: audioInput.id ? { deviceId: audioInput.id, ...AUDIO_CONSTRAINT } : { ...AUDIO_CONSTRAINT },
            video: false,
          });
          return s;
        } catch (err) {
          const er = err as DOMException;
          if (er.name === 'NotAllowedError') {
            return 'rejected';
          }
          return 'failed';
        }
      }
      return 'failed';
    }
  }, [audioInput, videoInput]);

  useEffect(() => {
    if (!isUpdateStream) {
      return;
    }

    const setTrack = async () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const startDate = new Date().getTime();
      setStreamStatus('pending');

      const newStream = await getStream();
      if (newStream === 'failed' || newStream === 'rejected') {
        setStreamStatus(newStream);
        setDeviceEnable({ mic: false, video: false });
        return;
      }

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

      const deviceInfo = await getCurrentDeviceInfo(newStream);

      deviceInfo.audioTrack.onended = () => {
        setStreamStatus('rejected');
      };

      if (deviceInfo.currentVideoInput.id) {
        deviceInfo.videoTrack.onended = () => {
          setStreamStatus('rejected');
        };

        setVideoInput(deviceInfo.currentVideoInput);
        setVideoInputList(deviceInfo.currentVideoInputList);
      }

      setAudioInputList(deviceInfo.currentAudioInputList);
      setAudioOutputList(deviceInfo.currentAudioOutputList);

      setAudioInput(deviceInfo.currentAudioInput);
      setAudioOutput(deviceInfo.currentAudioOutput);

      setStream(newStream);
      if (!deviceInfo.currentVideoInput.id) {
        setStreamStatus('videoFailed');
        setDeviceEnable((prev) => ({ ...prev, video: false }));
        return;
      }

      const timeDiff = new Date().getTime() - startDate;
      setTimeout(
        () => {
          setStreamStatus('success');
        },
        Math.max(1000 - timeDiff, 0),
      );
    };

    setTrack();
    setIsUpdateStream(false);

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [getStream, setAudioInput, setAudioOutput, setVideoInput, setDeviceEnable, stream, deviceEnable, isUpdateStream]);

  useEffect(() => {
    navigator.mediaDevices.ondevicechange = () => {
      setIsUpdateStream(true);
    };
    return () => {
      navigator.mediaDevices.ondevicechange = null;
    };
  }, []);

  return {
    stream,
    streamStatus,
    videoInputList,
    audioInputList,
    audioOutputList,
    handleAudioInputChange,
    handleAudioOutputChange,
    handleVideoInputChange,
    toggleAudioInput,
    toggleVideoInput,
  };
};

export default useDevice;
