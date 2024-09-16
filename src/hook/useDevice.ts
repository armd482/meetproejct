'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useDeviceStore } from '@/store/DeviceStore';
import { StreamStatusType } from '@/type/streamType';
import { getStreamConstraint } from '@/lib/getStreamConstraint';
import useCurrentDevice from './useCurrentDevice';
import useCheckPermission from './useCheckPermission';

const useDevice = () => {
  const {
    permission,
    deviceEnable,
    audioInput,
    videoInput,
    videoInputList,
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
      videoInputList: state.videoInputList,
      setPermission: state.setPermission,
      setDeviceEnable: state.setDeviceEnable,
      setAudioInput: state.setAudioInput,
      setAudioOutput: state.setAudioOutput,
      setVideoInput: state.setVideoInput,
    })),
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [streamStatus, setStreamStatus] = useState<StreamStatusType>(null);
  const [isUpdateStream, setIsUpdateStream] = useState<boolean>(true);

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
  }, [setDeviceEnable]);

  const handleUpdateStreamStatus = useCallback((value: StreamStatusType) => {
    setStreamStatus(value);
  }, []);

  const { updatePermission, addPermissionListener, checkPermissionQuery } =
    useCheckPermission(handleUpdateStreamStatus);

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
        }
        return { ...prev, video: !prev.video };
      });
    }
  };

  const getStream = useCallback(async () => {
    const newPermission = await updatePermission(true);

    try {
      const newStream = await navigator.mediaDevices.getUserMedia(
        getStreamConstraint(newPermission, { audio: audioInput.id, video: videoInput.id }),
      );
      return newStream;
    } catch (error) {
      const e = error as DOMException;
      if (e.name === 'NotAllowedError') {
        return 'rejected';
      }

      return 'failed';
    }
  }, [audioInput, videoInput, updatePermission]);

  const setTrack = useCallback(async () => {
    const isFailed = streamStatus === 'failed' ? streamStatus : null;
    setStreamStatus('pending');
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    const startDate = new Date().getTime();
    const newStream = await getStream();

    if (isFailed || newStream === 'failed' || newStream === 'rejected') {
      setStreamStatus(newStream === 'rejected' ? newStream : isFailed);
      setStream(null);
      setDeviceEnable({ audio: false, video: false });
      return;
    }

    if (!deviceEnable.audio) {
      const audioTrack = newStream.getAudioTracks();
      if (audioTrack) {
        newStream.getAudioTracks().forEach((track) => {
          track.enabled = false;
        });
      }
    }

    if (!deviceEnable.video) {
      const videoTrack = newStream.getVideoTracks();
      if (videoTrack) {
        newStream.getVideoTracks().forEach((track) => {
          track.stop();
        });
      }
    }

    updateDevice(newStream);
    setStream(newStream);

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
    const checkDevicePermission = async () => {
      if (!stream) {
        return;
      }
      const isEnableCheckPermission = await checkPermissionQuery();
      if (isEnableCheckPermission) {
        await addPermissionListener(updatePermission);
        return;
      }

      const checkTrack = async () => {
        if (!stream.active) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          updatePermission();
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
  }, [
    stream,
    addPermissionListener,
    updatePermission,
    setPermission,
    setDeviceEnable,
    handleUpdateStream,
    checkPermissionQuery,
  ]);

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
