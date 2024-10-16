import React, { useState, useEffect } from "react";
import "../../../src/style.css"
export default function ThemeSettings(){
    const [theme, setTheme] = useState(localStorage.getItem('lightTheme') || false);

    const [isDarkMode, setIsDarkMode] = useState(theme === 'theme-dark');

    const applyTheme = (themeName) => {
        setTheme(themeName);
        localStorage.setItem('theme', themeName);
        document.documentElement.className = themeName;
      };

      const toggleTheme = () => {
        if (theme === 'theme-dark') {
          applyTheme('theme-light');
          setIsDarkMode(false);
        } else {
          applyTheme('theme-dark');
          setIsDarkMode(true);
        }
      };  
    
      useEffect(() => {
        if (theme === 'theme-dark') {
          document.getElementById('slider').checked = true;
        } else {
          document.getElementById('slider').checked = false;
        }
        document.documentElement.className = theme;
      }, [theme]);

      return(
        <div className="App">
      <h1>{theme}</h1>
      <label className="switch">
        <input
          type="checkbox"
          id="slider"
          onChange={toggleTheme}
          checked={isDarkMode}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
      

}