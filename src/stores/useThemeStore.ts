import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  theme: string | null;
  actions: {
    setTheme: (theme: string | null) => void;
  };
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: null,
      actions: {
        setTheme: (theme) => set(() => ({ theme })),
      },
    }),
    {
      name: "theme",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
