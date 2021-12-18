import React, { useEffect, useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import styles from "./themeIcon.module.scss";

type Props = { label: string };

const ThemeIcon: React.VFC<Props> = ({ label }) => {
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
        label={label}
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
