import { create } from 'zustand';

type PermissionType = Record<'audio' | 'video', boolean>;
type PermissionCallback = (value: PermissionType) => PermissionType;

type DeviceType = Record<'id' | 'name', string>;
type DeviceCallback = (deviceEnable: Record<'video' | 'audio', boolean>) => Record<'video' | 'audio', boolean>;

type DeviceEnable = Record<'video' | 'audio', boolean>;

interface DeviceStoreType {
  permission: null | PermissionType;
  audioInput: DeviceType;
  audioOutput: DeviceType;
  videoInput: DeviceType;
  deviceEnable: DeviceEnable;
  audioInputList: MediaDeviceInfo[];
  audioOuputList: MediaDeviceInfo[];
  videoInputList: MediaDeviceInfo[];
  setPermission: (callback: Record<'audio' | 'video', boolean> | null | PermissionCallback) => void;
  setAudioInput: (value: DeviceType) => void;
  setAudioOutput: (value: DeviceType) => void;
  setVideoInput: (value: DeviceType) => void;
  setDeviceEnable: (callback: DeviceEnable | DeviceCallback) => void;
  setAudioInputList: (value: MediaDeviceInfo[]) => void;
  setAudioOutputList: (value: MediaDeviceInfo[]) => void;
  setVideoInputList: (value: MediaDeviceInfo[]) => void;
}

export const useDeviceStore = create<DeviceStoreType>((set) => ({
  permission: null,
  audioInput: { id: '', name: '' },
  audioOutput: { id: '', name: '' },
  videoInput: { id: '', name: '' },
  deviceEnable: { video: true, audio: true },
  audioInputList: [],
  audioOuputList: [],
  videoInputList: [],
  setPermission: (callback: Record<'audio' | 'video', boolean> | null | PermissionCallback) =>
    set((state) => {
      if (typeof callback === 'function') {
        return { permission: callback(state.permission ?? { audio: false, video: false }) };
      }
      return { permission: callback };
    }),
  setAudioInput: (value: Record<'id' | 'name', string>) => set(() => ({ audioInput: value })),
  setAudioOutput: (value: Record<'id' | 'name', string>) => set(() => ({ audioOutput: value })),
  setVideoInput: (value: Record<'id' | 'name', string>) => set(() => ({ videoInput: value })),
  setAudioInputList: (value: MediaDeviceInfo[]) => set(() => ({ audioInputList: value })),
  setAudioOutputList: (value: MediaDeviceInfo[]) => set(() => ({ audioOuputList: value })),
  setVideoInputList: (value: MediaDeviceInfo[]) => set(() => ({ videoInputList: value })),
  setDeviceEnable: (callback: DeviceEnable | DeviceCallback) =>
    set((state) => {
      if (typeof callback === 'function') {
        return { deviceEnable: callback(state.deviceEnable) };
      }
      return { deviceEnable: callback };
    }),
}));
