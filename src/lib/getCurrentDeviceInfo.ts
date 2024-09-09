const getDevice = (deviceList: MediaDeviceInfo[], currentDevice: MediaStreamTrack | MediaDeviceInfo | undefined) => {
  if (deviceList.length === 0 || !currentDevice) {
    return { name: '', id: '' };
  }

  const target = deviceList.find((device) => currentDevice.label.includes(device.label));

  if (!target) {
    return { name: deviceList[0].label, id: deviceList[0].deviceId };
  }

  return { name: target.label, id: target.deviceId };
};

export const getCurrentDeviceInfo = async (stream: MediaStream) => {
  const deviceInfo = await navigator.mediaDevices.enumerateDevices();

  const videoInputList = deviceInfo.filter(
    (device) => device.kind === 'videoinput' && device.deviceId !== 'default' && device.deviceId !== 'communications',
  );

  const audioInputList = deviceInfo.filter(
    (device) => device.kind === 'audioinput' && device.deviceId !== 'default' && device.deviceId !== 'communications',
  );

  const audioOutputList = deviceInfo.filter(
    (device) => device.kind === 'audiooutput' && device.deviceId !== 'default' && device.deviceId !== 'communications',
  );

  const currentAudioInput = stream.getAudioTracks()[0];
  const currentVideoInput = stream.getVideoTracks()[0];
  const currentAudioOutput = deviceInfo.filter((device) => device.kind === 'audiooutput')[0];

  return {
    currentAudioInputList: audioInputList,
    currentAudioOutputList: audioOutputList,
    currentVideoInputList: videoInputList,
    currentAudioInput: getDevice(audioInputList, currentAudioInput),
    currentAudioOutput: getDevice(audioOutputList, currentAudioOutput),
    currentVideoInput: getDevice(videoInputList, currentVideoInput),
    audioTrack: currentAudioInput,
    videoTrack: currentVideoInput,
  };
};
