import React from "react";

function ThemeToggle({
  darkMode,
  setDarkMode
}) {

  return (

    <button
      className="btn btn-secondary"
      onClick={() =>
        setDarkMode(!darkMode)
      }>

      {darkMode
        ? "☀ Light Mode"
        : "🌙 Dark Mode"}

    </button>

  );
}

export default ThemeToggle;