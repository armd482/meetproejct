import create from 'zustand';

type DeviceType = Record<'id' | 'name', string>;
type Callback = (deviceEnable: Record<'video' | 'mic', boolean>) => Record<'video' | 'mic', boolean>;

type DeviceEnable = Record<'video' | 'mic', boolean>;

interface DeviceStoreType {
  audioInput: DeviceType;
  audioOutput: DeviceType;
  videoInput: DeviceType;
  deviceEnable: DeviceEnable;
  setAudioInput: (value: DeviceType) => void;
  setAudioOutput: (value: DeviceType) => void;
  setVideoInput: (value: DeviceType) => void;
  setDeviceEnable: (callback: DeviceEnable | Callback) => void;
}

export const useDeviceStore = create<DeviceStoreType>((set) => ({
  audioInput: { id: '', name: '' },
  audioOutput: { id: '', name: '' },
  videoInput: { id: '', name: '' },
  deviceEnable: { video: true, mic: true },
  setAudioInput: (value: Record<'id' | 'name', string>) => set(() => ({ audioInput: value })),
  setAudioOutput: (value: Record<'id' | 'name', string>) => set(() => ({ audioOutput: value })),
  setVideoInput: (value: Record<'id' | 'name', string>) => set(() => ({ videoInput: value })),
  setDeviceEnable: (callback) =>
    set((state) => {
      if (typeof callback === 'function') {
        return { deviceEnable: callback(state.deviceEnable) };
      }
      return { deviceEnable: callback };
    }),
}));
