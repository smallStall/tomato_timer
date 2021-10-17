import React, { useContext, useState } from "react";
import { FormControlLabel, Switch } from "@material-ui/core";
import styles from "../../styles/components/themeIcon.module.scss";



const ThemeIcon = () => {
  const [isDarkMode, setDarkMode] = useState("light");
  const toggleDataTheme = () => {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    let targetTheme = "light";
    if (currentTheme === "light") {
        targetTheme = "dark";
    }
    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
    setDarkMode((prev) => prev === "dark" ? "light" : "dark");
  }
  
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            classes={{
              root: styles.root,
              switchBase: styles.switchBase,
              checked: styles.checked,
              thumb: styles.thumb,
              track: styles.track,
            }}
            checked={isDarkMode === "dark"}
            onChange={toggleDataTheme}
            aria-label="login switch"
          />
        }
        label={isDarkMode ? "Dark Theme" : "Light Theme"}
      />
    </>
  );
};

export default ThemeIcon;
