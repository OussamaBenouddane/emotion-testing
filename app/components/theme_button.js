import "./button.css";

export default function ThemeToggle({ onToggle, theme }) {

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    onToggle(newTheme); // Pass to parent
  };

  return (
    <button onClick={toggleTheme} className={`theme-btn ${theme}`}>
      {theme === "light" ? "🌞" : "🌜"}
    </button>
  );
}
