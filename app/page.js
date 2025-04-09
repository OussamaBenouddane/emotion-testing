"use client";

import { useState, useEffect } from "react";
import Header from "./parts/header";
import Main from "./parts/main";
import Footer from "./parts/footer";

export default function Home() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    document.body.classList.replace(theme, (mediaQuery.matches ? 'dark' : 'light'));
    setTheme(mediaQuery.matches ? 'dark' : 'light');
  }, []);

  const handleThemeToggle = (newTheme) => {
      let elements = document.getElementsByClassName(theme)
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.replace(theme, newTheme);
      }
      setTheme(newTheme);
  };

  return (
    <main className="page">
      <div className="main">
        <Header handleThemeToggle={handleThemeToggle} theme={theme} />
        <Main theme={theme} />
        <Footer theme={theme} />
      </div>
    </main>
  );
}