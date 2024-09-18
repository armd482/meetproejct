import { RefObject } from 'react';

export const setTrackChage = async (
  stream: MediaStream | null,
  mediaRef: RefObject<HTMLVideoElement | HTMLAudioElement>,
  device: MediaDeviceInfo,
  type: 'audioInput' | 'videoInput' | 'audioOutput',
) => {
  if (type === 'audioOutput') {
    if (mediaRef.current) {
      mediaRef.current.setSinkId(device.deviceId);
    }
    return;
  }
  if (stream && mediaRef.current) {
    const newStream = await navigator.mediaDevices.getUserMedia({
      audio: type === 'audioInput' ? { deviceId: device.deviceId } : false,
      video: type === 'videoInput' ? { deviceId: device.deviceId } : false,
    });

    const newTrack = type === 'audioInput' ? newStream.getAudioTracks()[0] : newStream.getVideoTracks()[0];
    const oldTrack = type === 'audioInput' ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];

    if (oldTrack) {
      stream.removeTrack(oldTrack);
    }

    stream.addTrack(newTrack);
  }
};
