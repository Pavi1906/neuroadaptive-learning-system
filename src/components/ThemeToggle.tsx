import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-all w-full text-left"
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
