import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import React, {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
} from "react";
import MenuAppBar from "../components/organisms/appMenuBar";

type Props = {
  children: React.ReactNode;
};
export const DarkModeContext = createContext<{
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  isDarkMode: boolean;
}>({ setDarkMode: () => {}, isDarkMode: false });

export default function ThemeButton({ children }: Props) {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  React.useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("darkMode", "on");
    } else {
      localStorage.setItem("darkMode", "off");
    }
    console.log(theme.palette)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#65272b",
        contrastText: "#fff4d6"
      },
      secondary: {
        light: isDarkMode ? "#321315" : "#C4ACAE",
        main: "#825058",
      },
      background: {
        paper: "#65272b",
        default: isDarkMode ? "#412b1c" : "#fff4d6",
      },
      type: isDarkMode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DarkModeContext.Provider value={{ setDarkMode, isDarkMode }}>
        <MenuAppBar />
        {children}
      </DarkModeContext.Provider>
    </ThemeProvider>
  );
}
