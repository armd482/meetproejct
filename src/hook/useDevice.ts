'use client';

import { useState, useEffect, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useDeviceStore } from '@/store/DeviceStore';
import { StreamStatusType } from '@/type/streamType';
import { getStreamConstraint } from '@/lib/getStreamConstraint';
import { getCurrentDeviceInfo } from '@/lib/getCurrentDeviceInfo';

const useDevice = () => {
  const {
    permission,
    deviceEnable,
    audioInput,
    videoInput,
    setPermission,
    setDeviceEnable,
    setAudioInput,
    setAudioOutput,
    setVideoInput,
  } = useDeviceStore(
    useShallow((state) => ({
      permission: state.permission,
      deviceEnable: state.deviceEnable,
      audioInput: state.audioInput,
      videoInput: state.videoInput,
      setPermission: state.setPermission,
      setDeviceEnable: state.setDeviceEnable,
      setAudioInput: state.setAudioInput,
      setAudioOutput: state.setAudioOutput,
      setVideoInput: state.setVideoInput,
    })),
  );

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [streamStatus, setStreamStatus] = useState<StreamStatusType>(null);
  const [isUpdateStream, setIsUpdateStream] = useState<boolean>(false);

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

  const handleUpdateStream = () => {
    setDeviceEnable({ video: true, mic: true });
    setIsUpdateStream(true);
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
        } else {
          setIsUpdateStream(true);
        }
        return { ...prev, video: !prev.video };
      });
    }
  };

  const checkPermission = useCallback(
    async (audio: boolean, video: boolean) => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio, video });
        setPermission({ audio, video });
        setDeviceEnable((prev) => ({ mic: audio && prev.mic, video: video && prev.video }));
        setIsUpdateStream(true);
        return true;
      } catch {
        return false;
      }
    },
    [setDeviceEnable, setPermission],
  );

  const updatePermission = useCallback(async () => {
    if (await checkPermission(true, true)) {
      return;
    }

    if (await checkPermission(true, false)) {
      return;
    }

    if (await checkPermission(false, true)) {
      return;
    }

    if (await checkPermission(false, false)) {
      return;
    }
    setPermission({ audio: false, video: false });
    setDeviceEnable({ mic: false, video: false });
    setIsUpdateStream(true);
  }, [checkPermission, setPermission, setDeviceEnable]);

  const getStream = useCallback(async () => {
    if (!permission) {
      return 'failed';
    }

    try {
      const newStream = await navigator.mediaDevices.getUserMedia(
        getStreamConstraint(permission, { audio: audioInput.id, video: videoInput.id }),
      );
      return newStream;
    } catch (error) {
      const e = error as DOMException;
      if (e.name === 'NotAllowedError') {
        return 'rejected';
      }

      return 'failed';
    }
  }, [audioInput, videoInput, permission]);

  const setTrack = useCallback(async () => {
    if (!permission) {
      return;
    }
    setStreamStatus('pending');
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    const startDate = new Date().getTime();
    const newStream = await getStream();

    if (newStream === 'failed' || newStream === 'rejected') {
      setStreamStatus(newStream);
      setStream(null);
      setDeviceEnable({ mic: false, video: false });
      return;
    }

    if (!deviceEnable.mic) {
      newStream.getAudioTracks().forEach((track) => {
        track.enabled = false;
      });
    }

    if (!deviceEnable.video) {
      newStream.getVideoTracks().forEach((track) => {
        track.stop();
      });
    }

    const deviceInfo = await getCurrentDeviceInfo(newStream);

    setVideoInput(deviceInfo.currentVideoInput);
    setVideoInputList(deviceInfo.currentVideoInputList);

    setAudioInput(deviceInfo.currentAudioInput);
    setAudioInputList(deviceInfo.currentAudioInputList);

    setAudioOutput(deviceInfo.currentAudioOutput);
    setAudioOutputList(deviceInfo.currentAudioOutputList);

    setStream(newStream);

    const timeDiff = new Date().getTime() - startDate;
    setTimeout(
      () => {
        setStreamStatus('success');
      },
      Math.max(1000 - timeDiff, 0),
    );
  }, [stream, deviceEnable, permission, getStream, setAudioInput, setAudioOutput, setVideoInput, setDeviceEnable]);

  useEffect(() => {
    updatePermission();
    setIsUpdateStream(true);
  }, [updatePermission, setPermission, setDeviceEnable]);

  useEffect(() => {
    if (isUpdateStream && permission) {
      setIsUpdateStream(false);
      setTrack();
    }
  }, [stream, permission, isUpdateStream, getStream, setTrack]);

  useEffect(() => {
    navigator.mediaDevices.ondevicechange = () => {
      setIsUpdateStream(true);
    };
    return () => {
      navigator.mediaDevices.ondevicechange = null;
    };
  }, []);

  useEffect(() => {
    if (!stream) {
      return;
    }
    const checkTrack = async (id: NodeJS.Timeout) => {
      if (!stream.active) {
        clearInterval(id);
        updatePermission();
      }
    };

    const timerId = setInterval(() => checkTrack(timerId), 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [stream, updatePermission, setPermission, setDeviceEnable]);

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
    handleUpdateStream,
  };
};

export default useDevice;
