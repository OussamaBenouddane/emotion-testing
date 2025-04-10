"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null); // null until checked

  // Run once on mount to detect browser preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.body.classList.add(initialTheme);
  }, []);

  // Also update <body> class and localStorage when theme changes
  useEffect(() => {
    if (!theme) return;
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* Optional: block rendering until theme is set to avoid flicker */}
      {theme ? children : null}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
