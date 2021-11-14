import React, { useEffect, useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import styles from "./themeIcon.module.scss";

const ThemeIcon = () => {
  const [isDarkMode, setDarkMode] = useState(false); //string -> boolean

  useEffect(() => {
    const currentTheme = localStorage.getItem("isDark");
    if (currentTheme != null) {
      setDarkMode(JSON.parse(currentTheme));
      document.documentElement.setAttribute("isDark", currentTheme.toString());
    }
  }, []);

  const toggleDataTheme = () => {
    const currentTheme = document.documentElement.getAttribute("isDark");

    const newTheme: boolean = !JSON.parse(
      currentTheme == null ? "false" : currentTheme
    );
    setDarkMode(newTheme);
    document.documentElement.setAttribute("isDark", newTheme.toString());
    localStorage.setItem("isDark", newTheme.toString());
  };

  return (
    <div>
      <FormControlLabel
        className={styles.root}
        label={"Theme"}
        classes={{
          label: styles.label,
        }}
        labelPlacement="start"
        control={
          <Switch
            classes={{
              root: styles.switch,
              switchBase: styles.switchBase,
              checked: styles.checked,
              thumb: styles.thumb,
              track: styles.track,
            }}
            checked={isDarkMode}
            onChange={toggleDataTheme}
          />
        }
      />
    </div>
  );
};

export default ThemeIcon;
