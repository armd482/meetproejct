import create from 'zustand';

interface DeviceStoreType {
  audioInputId: string;
  audioOutputId: string;
  videoInputId: string;
  setAudioInputId: (value: string) => void;
  setAudioOutputId: (value: string) => void;
  setVideoInputId: (value: string) => void;
}

export const useDeviceStore = create<DeviceStoreType>((set) => ({
  audioInputId: '',
  audioOutputId: '',
  videoInputId: '',

  setAudioInputId: (value: string) => set(() => ({ audioInputId: value })),
  setAudioOutputId: (value: string) => set(() => ({ audioOutputId: value })),
  setVideoInputId: (value: string) => set(() => ({ videoInputId: value })),
}));
