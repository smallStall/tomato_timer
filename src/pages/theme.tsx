import { createTheme,  CssBaseline, IconButton, colors, ThemeProvider } from "@material-ui/core";
import React, { useState } from "react";
import ThemeIcon from '../components/organisms/themeIcon'

type Props = {
  children: React.ReactNode,
}



export default function ThemeButton ({children} : Props){
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const  setMode = (isDark : boolean) => {
    setDarkMode(isDark); 
  }
  React.useEffect(() => {
    if (isDarkMode){
      localStorage.setItem("darkMode", "on")
    }else{
      localStorage.setItem("darkMode", "off")
    }
  }, [isDarkMode]);


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
        <ThemeIcon isDarkMode={isDarkMode} setMode={setMode} />
      {children}
    </ThemeProvider>
  )
}