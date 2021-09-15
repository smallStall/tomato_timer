import { createTheme, makeStyles, CssBaseline, IconButton, colors, ThemeProvider } from "@material-ui/core";
import React, { Dispatch, SetStateAction, useState } from "react";
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';

type Props = {
  children: React.ReactNode,
}

export default function ThemeIcon ({children} : Props){
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const handleDarkModeOn = () => {
    localStorage.setItem("darkMode", "on");
    setDarkMode(true);
  };
  const handleDarkModeOff = () => {
    localStorage.setItem("darkMode", "off");
    setDarkMode(false);
  };
  React.useEffect(() => {
    if (localStorage.getItem("darkMode") === "on"){
      setDarkMode(true);
    } else if (localStorage.getItem("darkMode") === "off") {
      setDarkMode(false)
    } else if (window.matchMedia('(prefers-color-scheme: dark)')){
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, []);


  const theme = createTheme({
    palette: {
      primary: {
        main: colors.blue[800],
      },
      type: isDarkMode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      {isDarkMode ? (
        <IconButton color="inherit" onClick={handleDarkModeOff}>
          <Brightness7Icon />
        </IconButton>
      ) : (
        <IconButton color="inherit" onClick={handleDarkModeOn}>
          <Brightness4Icon />
        </IconButton>
      )}
    </ThemeProvider>
  )
}