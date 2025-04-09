import ThemeToggle from "../components/theme_button";
import "./header.css";

export default function Header({ handleThemeToggle, theme }) {
  
  return (
    <header className={`header ${theme}`}>
      <h1>Emotion Testing</h1>
      <ThemeToggle onToggle={handleThemeToggle} theme={theme} />
    </header>
  );
}