import {
  createTheme,
  CssBaseline,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core";
import React, {
  useState,
  useEffect,
  createContext,
  SetStateAction,
  Dispatch,
} from "react";
import Menu from "../components/organisms/menu";


const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(var(--warning))",//"#ae0d16",
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: `var(--background)`,
      },
    },
  },
});

type Props = {
  children: React.ReactNode;
};
export const DarkModeContext = createContext<{
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  isDarkMode: boolean;
}>({ setDarkMode: () => {}, isDarkMode: false });

export const VolumeContext = createContext<{
  setVolume: Dispatch<SetStateAction<number>>;
  volume: number;
}>({ setVolume: () => {}, volume: 0 });

export const InputMemoContext = createContext<{
  setInputMemo: Dispatch<SetStateAction<boolean>>;
  isInputMemo: boolean;
}>({ setInputMemo: () => {}, isInputMemo: false });

//TODO ボリューム調整
export default function ThemeButton({ children }: Props) {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0);
  const [isInputMemo, setInputMemo] = useState<boolean>(false);


  useEffect(() => {
    setDarkMode(localStorage.getItem("darkMode") === "on" ? true : false);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("darkMode", "on");
    } else {
      localStorage.setItem("darkMode", "off");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <VolumeContext.Provider value={{ setVolume, volume }}>
            <Menu />
          <InputMemoContext.Provider value={{ setInputMemo, isInputMemo }}>
            {children}
          </InputMemoContext.Provider>
        </VolumeContext.Provider>
      </ThemeProvider>
    </>
  );
}
