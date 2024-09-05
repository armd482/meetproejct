import create from 'zustand';

interface DeviceStoreType {
  audioInputId: string;
  audioOutputId: string;
  videoInputId: string;
  deviceEnable: Record<'video' | 'mic', boolean>;
  setAudioInputId: (value: string) => void;
  setAudioOutputId: (value: string) => void;
  setVideoInputId: (value: string) => void;
  setDeviceEnable: (value: Record<'video' | 'mic', boolean>) => void;
}

export const useDeviceStore = create<DeviceStoreType>((set) => ({
  audioInputId: '',
  audioOutputId: '',
  videoInputId: '',
  deviceEnable: { video: true, mic: true },
  setAudioInputId: (value: string) => set(() => ({ audioInputId: value })),
  setAudioOutputId: (value: string) => set(() => ({ audioOutputId: value })),
  setVideoInputId: (value: string) => set(() => ({ videoInputId: value })),
  setDeviceEnable: (value: Record<'video' | 'mic', boolean>) =>
    set(() => ({ deviceEnable: value })),
}));
