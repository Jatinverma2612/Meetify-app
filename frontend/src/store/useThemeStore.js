import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("meetify-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("meetify-theme", theme);
    set({ theme });
  },
}));