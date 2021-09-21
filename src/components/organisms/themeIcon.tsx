import React, { useContext } from "react";

import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { IconButton, FormControlLabel, Switch } from "@material-ui/core";
import { DarkModeContext } from "../../pages/theme";

type Props = {
  isDarkMode: boolean;
  setMode: (isDark: boolean) => void;
};

const ThemeIcon = () => {
  const { isDarkMode, setDarkMode } = useContext(DarkModeContext);
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={isDarkMode}
            onChange={() => setDarkMode((prev) => !prev)}
            aria-label="login switch"
          />
        }
        label={isDarkMode ? "Dark Mode ON" : "Dark Mode OFF"}
      />
    </>
  );
};

export default ThemeIcon;
