'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useDeviceStore } from '@/store/DeviceStore';
import { StreamStatusType } from '@/type/streamType';
import { getStreamConstraint } from '@/lib/getStreamConstraint';
import useCurrentDevice from './useCurrentDevice';
import useCheckPermission from './useCheckPermission';

const useDevice = (isInitialGetStream = true) => {
  const {
    deviceEnable,
    audioInput,
    videoInput,
    videoInputList,
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
      videoInputList: state.videoInputList,
      setDeviceEnable: state.setDeviceEnable,
      setAudioInput: state.setAudioInput,
      setAudioOutput: state.setAudioOutput,
      setVideoInput: state.setVideoInput,
    })),
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [streamStatus, setStreamStatus] = useState<StreamStatusType>(null);
  const [isUpdateStream, setIsUpdateStream] = useState<boolean>(isInitialGetStream);

  const { updateDevice } = useCurrentDevice();

  const handleAudioInputChange = (value: Record<'id' | 'name', string>) => {
    setAudioInput(value);
  };

  const handleAudioOutputChange = (value: Record<'id' | 'name', string>) => {
    setAudioOutput(value);
  };

  const handleVideoInputChange = (value: Record<'id' | 'name', string>) => {
    setVideoInput(value);
  };

  const handleUpdateStream = useCallback(() => {
    setDeviceEnable({ video: true, audio: true });
    setIsUpdateStream(true);
    setStreamStatus(null);
  }, [setDeviceEnable]);

  const { isSupportedPermission, updatePermission, addPermissionListener } = useCheckPermission();

  const toggleAudioInput = async () => {
    if (stream) {
      setDeviceEnable((prev) => {
        const newValue = !prev.audio;
        stream.getAudioTracks().forEach((track) => {
          track.enabled = newValue;
        });
        return { ...prev, audio: newValue };
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
          setStreamStatus(null);
        }
        return { ...prev, video: !prev.video };
      });
    }
  };

  const getStream = useCallback(async () => {
    const newPermission = await updatePermission();
    try {
      const newStream = await navigator.mediaDevices.getUserMedia(
        getStreamConstraint(newPermission, { audio: audioInput.id, video: videoInput.id }),
      );
      return { stream: newStream, isFailed: newPermission.isFailed };
    } catch (error) {
      const e = error as DOMException;
      if (e.name === 'NotAllowedError') {
        return 'rejected';
      }

      return 'failed';
    }
  }, [audioInput, videoInput, updatePermission]);

  const setTrack = useCallback(async () => {
    if (streamStatus) {
      setStreamStatus('pending');
    }

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    const startDate = new Date().getTime();
    const newStream = await getStream();

    if (newStream === 'failed' || newStream === 'rejected') {
      setStreamStatus(newStream === 'rejected' ? newStream : 'failed');
      setStream(null);
      setDeviceEnable({ audio: false, video: false });
      return;
    }

    if (!deviceEnable.audio) {
      const audioTrack = newStream.stream.getAudioTracks();
      if (audioTrack) {
        newStream.stream.getAudioTracks().forEach((track) => {
          track.enabled = false;
        });
      }
    }

    if (!deviceEnable.video) {
      const videoTrack = newStream.stream.getVideoTracks();
      if (videoTrack) {
        newStream.stream.getVideoTracks().forEach((track) => {
          track.stop();
        });
      }
    }

    await updateDevice(newStream.stream);
    setStream(newStream.stream);
    if (newStream.isFailed) {
      setStreamStatus('failed');
      return;
    }

    const timeDiff = new Date().getTime() - startDate;
    setTimeout(
      () => {
        setStreamStatus('success');
      },
      Math.max(1000 - timeDiff, 0),
    );
  }, [stream, deviceEnable, streamStatus, getStream, setDeviceEnable, updateDevice]);

  useEffect(() => {
    if (isUpdateStream) {
      setIsUpdateStream(false);
      setTrack();
    }
  }, [stream, isUpdateStream, getStream, setTrack, setDeviceEnable]);

  useEffect(() => {
    navigator.mediaDevices.ondevicechange = () => {
      setIsUpdateStream(true);
      setStreamStatus(null);
      setDeviceEnable({ audio: true, video: true });
    };
    return () => {
      navigator.mediaDevices.ondevicechange = null;
    };
  }, [setDeviceEnable]);

  useEffect(() => {
    const checkDevicePermission = async () => {
      if (!stream || isSupportedPermission === null) {
        return;
      }
      if (isSupportedPermission !== false) {
        await addPermissionListener(() => {
          setIsUpdateStream(true);
          setStreamStatus(null);
        });
        return;
      }

      const checkTrack = async () => {
        if (!stream.active) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setIsUpdateStream(true);
        }
      };
      timerRef.current = setInterval(checkTrack, 1000);
    };

    checkDevicePermission();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [stream, isSupportedPermission, addPermissionListener, updatePermission, setDeviceEnable, handleUpdateStream]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return {
    stream,
    streamStatus,
    handleAudioInputChange,
    handleAudioOutputChange,
    handleVideoInputChange,
    toggleAudioInput,
    toggleVideoInput,
    handleUpdateStream,
  };
};

export default useDevice;
