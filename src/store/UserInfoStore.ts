import { create } from 'zustand';

interface UserInfoStoreType {
  id: string;
  name: string;
  color: string;
  setId: (value: string) => void;
  setName: (value: string) => void;
  setColor: (value: string) => void;
}

export const useUserInfoStore = create<UserInfoStoreType>((set) => ({
  id: '',
  name: '',
  color: '',
  setId: (value: string) => set(() => ({ id: value })),
  setName: (value: string) => set(() => ({ name: value })),
  setColor: (value: string) => set(() => ({ color: value })),
}));
