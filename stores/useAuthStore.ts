// useAuthStore.ts
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  username: string;
  campus?: string;
  displayName?: string;
};

type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  loadUserFromStorage: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  setUser: (user) => {
    // บันทึกข้อมูลผู้ใช้ใน AsyncStorage เพื่อให้ข้อมูลไม่หายเมื่อแอปปิด
    AsyncStorage.setItem("tu_user", JSON.stringify(user));
    set({ user });
  },

  logout: async () => {
    // ลบข้อมูลผู้ใช้จาก AsyncStorage
    await AsyncStorage.removeItem("tu_user");

    // รีเซ็ต user ใน store
    set({ user: null });
  },

  loadUserFromStorage: async () => {
    // โหลดข้อมูลผู้ใช้จาก AsyncStorage
    const json = await AsyncStorage.getItem("tu_user");
    if (json) {
      set({ user: JSON.parse(json) });
    }
  },
}));
