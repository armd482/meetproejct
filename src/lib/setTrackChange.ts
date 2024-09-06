import { RefObject } from 'react';

export const setTrackChage = async (
  stream: MediaStream | null,
  mediaRef: RefObject<HTMLVideoElement | HTMLAudioElement>,
  device: MediaDeviceInfo,
  type: 'audioInput' | 'videoInput' | 'audioOutput',
  audioInputId: string,
  videoInputId: string,
) => {
  if (type === 'audioOutput') {
    if (mediaRef.current) {
      mediaRef.current.setSinkId(device.deviceId);
    }
    return;
  }
  if (stream && mediaRef.current) {
    const newStream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: type === 'audioInput' ? device.deviceId : audioInputId },
      video: { deviceId: type === 'videoInput' ? device.deviceId : videoInputId },
    });
    const newTrack = type === 'audioInput' ? newStream.getAudioTracks()[0] : newStream.getVideoTracks()[0];
    const oldTrack = type === 'audioInput' ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];

    if (oldTrack) {
      stream.removeTrack(oldTrack);
    }

    stream.addTrack(newTrack);
    mediaRef.current.srcObject = stream;
  }
};
