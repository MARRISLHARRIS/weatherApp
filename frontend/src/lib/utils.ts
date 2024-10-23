import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { create } from 'zustand';

type Store = {
  dataChanged: boolean;
  setDataChanged: () => void;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useStore = create<Store>()((set) => ({
  dataChanged: false,
  setDataChanged: () => set((state) => ({ dataChanged: !state.dataChanged })),
}));
