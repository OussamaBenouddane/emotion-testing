"use client";

import { useState } from "react";
import Header from "./parts/header";
import Main from "./parts/main";
import Footer from "./parts/footer";
import { useTheme } from "./theme-context";

export default function Home() {
  
  const {theme, setTheme} = useTheme();
  console.log(theme)
  document.body.className += ` ${theme}`
  

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