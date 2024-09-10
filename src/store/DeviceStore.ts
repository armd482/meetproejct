import { create } from 'zustand';

type PermissionType = Record<'audio' | 'video', boolean>;
type PermissionCallback = (value: PermissionType) => PermissionType;

type DeviceType = Record<'id' | 'name', string>;
type DeviceCallback = (deviceEnable: Record<'video' | 'mic', boolean>) => Record<'video' | 'mic', boolean>;

type DeviceEnable = Record<'video' | 'mic', boolean>;

interface DeviceStoreType {
  permission: null | PermissionType;
  audioInput: DeviceType;
  audioOutput: DeviceType;
  videoInput: DeviceType;
  deviceEnable: DeviceEnable;
  setPermission: (callback: Record<'audio' | 'video', boolean> | PermissionCallback) => void;
  setAudioInput: (value: DeviceType) => void;
  setAudioOutput: (value: DeviceType) => void;
  setVideoInput: (value: DeviceType) => void;
  setDeviceEnable: (callback: DeviceEnable | DeviceCallback) => void;
}

export const useDeviceStore = create<DeviceStoreType>((set) => ({
  permission: null,
  audioInput: { id: '', name: '' },
  audioOutput: { id: '', name: '' },
  videoInput: { id: '', name: '' },
  deviceEnable: { video: true, mic: true },
  setPermission: (callback: Record<'audio' | 'video', boolean> | PermissionCallback) =>
    set((state) => {
      if (typeof callback === 'function') {
        return { permission: callback(state.permission ?? { audio: false, video: false }) };
      }
      return { permission: callback };
    }),
  setAudioInput: (value: Record<'id' | 'name', string>) => set(() => ({ audioInput: value })),
  setAudioOutput: (value: Record<'id' | 'name', string>) => set(() => ({ audioOutput: value })),
  setVideoInput: (value: Record<'id' | 'name', string>) => set(() => ({ videoInput: value })),
  setDeviceEnable: (callback: DeviceEnable | DeviceCallback) =>
    set((state) => {
      if (typeof callback === 'function') {
        return { deviceEnable: callback(state.deviceEnable) };
      }
      return { deviceEnable: callback };
    }),
}));
