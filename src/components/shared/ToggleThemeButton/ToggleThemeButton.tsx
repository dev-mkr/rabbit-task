import { useThemeStore } from "@/stores/useThemeStore";
import { Moon, Sun } from "lucide-react";

export const ToggleThemeButton = () => {
  const { setTheme } = useThemeStore((state) => state.actions);
  const selectedTheme = useThemeStore((state) => state.theme);

  const handelToggleTheme = () => {
    setTheme(selectedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handelToggleTheme}
      className="w-fit rounded-lg border border-gray-300 px-3 py-2.5 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
      aria-label="Toggle theme mode"
      data-testid="theme-button"
    >
      {selectedTheme === "dark" ? (
        <Sun
          className="h-5 w-5 text-gray-900 dark:text-white"
          data-testid="sun-icon"
        />
      ) : (
        <Moon
          className="h-5 w-5 text-gray-900 dark:text-white"
          data-testid="moon-icon"
        />
      )}
    </button>
  );
};
