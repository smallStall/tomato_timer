import React, { useEffect, useState } from "react";
import { FormControlLabel, Switch } from "@material-ui/core";
import styles from "../../styles/components/themeIcon.module.scss";

const ThemeIcon = () => {
  const [isDarkMode, setDarkMode] = useState("light");
  useEffect(() => {
    let currentTheme = localStorage.getItem("theme");
    setDarkMode(currentTheme != null ? currentTheme : "light");
  }, []);
  const toggleDataTheme = () => {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    currentTheme = currentTheme !== "light" ? "light" : "dark";
    setDarkMode(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  };

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
