"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({
  onDarkBackground = false,
}: { onDarkBackground?: boolean }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (!mounted) {
    return (
      <button
        className="w-11 h-11 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
        aria-label="Theme toggle"
      >
        <Sun className="w-4 h-4 text-white/70" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-11 h-11 rounded-lg flex items-center justify-center hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
      aria-label={
        theme === "light" ? "Dunkelmodus aktivieren" : "Hellmodus aktivieren"
      }
    >
      {theme === "light" ? (
        <Moon
          className={`w-4 h-4 transition-colors ${onDarkBackground ? "text-white" : "text-gray-700 dark:text-white/80"}`}
        />
      ) : (
        <Sun className="w-4 h-4 text-yellow-400 hover:text-yellow-300 transition-colors" />
      )}
    </button>
  );
}
