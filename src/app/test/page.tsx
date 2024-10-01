'use client';

/* eslint-disable */

import { useDevice } from '@/hook';
import { useDeviceStore } from '@/store/DeviceStore';
import { useShallow } from 'zustand/react/shallow';

export default function Page() {
  const { stream } = useDevice();
  const { audioInput, audioOutput, videoInput, audioInputList, audioOutputList, videoInputList } = useDeviceStore(
    useShallow((state) => ({
      audioInput: state.audioInput,
      audioOutput: state.audioOutput,
      videoInput: state.videoInput,
      audioInputList: state.audioInputList,
      audioOutputList: state.audioOuputList,
      videoInputList: state.videoInputList,
    })),
  );
  return (
    <div>
      <div>
        <h1>AudioInput</h1>
        <p>{`current: id - ${audioInput.id}, name - ${audioInput.name}`}</p>
        <h2>AudioInputList</h2>
        {audioInputList.map((device) => (
          <p key={device.deviceId}>{`id - ${device.deviceId}, name - ${device.label}`}</p>
        ))}
      </div>
      <br />
      <div>
        <h1>AudioOutput</h1>
        <p>{`current: id - ${audioOutput.id}, name - ${audioOutput.name}`}</p>
        <h2>audioOutputList</h2>
        {audioOutputList.map((device) => (
          <p key={device.deviceId}>{`id - ${device.deviceId}, name - ${device.label}`}</p>
        ))}
      </div>
      <br />
      <div>
        <h1>videoInput</h1>
        <p>{`current: id - ${videoInput.id}, name - ${videoInput.name}`}</p>
        <h2>videoInputList</h2>
        {videoInputList.map((device) => (
          <p key={device.deviceId}>{`id - ${device.deviceId}, name - ${device.label}`}</p>
        ))}
      </div>
      <br />
    </div>
  );
}
