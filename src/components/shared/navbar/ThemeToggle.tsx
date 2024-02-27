"use client";
import React, { useState, useEffect } from "react";

const ThemeToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Apply theme when component mounts
    applyTheme();
  }, [theme]);

  const toggleTheme = (selectedTheme: string) => {
    setTheme(selectedTheme);
  };

  const applyTheme = () => {
    // Remove existing classes
    document.documentElement.classList.remove("dark", "light");

    // Add the selected theme class
    document.documentElement.classList.add(theme);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="relative">
        <button
          onClick={toggleMenu}
          type="button"
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full  border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-100  focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 dark:bg-slate-600 ${
            isOpen ? "rounded-b-none" : ""
          }`}
          aria-haspopup="true"
          aria-expanded="true"
        >
          {theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "🌐"}
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5  focus:outline-none">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button
                onClick={() => toggleTheme("dark")}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                🌙
              </button>
              <button
                onClick={() => toggleTheme("light")}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                ☀️
              </button>
              <button
                onClick={() => toggleTheme("system")}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                🌐
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
