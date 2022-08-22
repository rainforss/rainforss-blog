import { useState, useEffect } from "react";
import { RiSunFill, RiMoonFill } from "react-icons/ri/index";

interface IModeToggleButtonProps {}

export default function ModeToggleButton(props: IModeToggleButtonProps) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");
  const handleThemeChange = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <button
      onClick={handleThemeChange}
      className={theme === "light" ? "text-yellow-500" : "text-orange-500"}
    >
      {theme === "light" ? (
        <RiMoonFill aria-label="Toggle Darkmode" />
      ) : (
        <RiSunFill aria-label="Toggle Lightmode" />
      )}
    </button>
  );
}
