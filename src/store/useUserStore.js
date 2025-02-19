import { create } from "zustand";

export const useUserStore = create((set) => ({
    userData: null,
    loading: true,
    setUserData: (data) => set({ userData: data, loading: false}),
}))