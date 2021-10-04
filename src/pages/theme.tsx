import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React, {
  useState,
  useEffect,
  createContext,
  SetStateAction,
  Dispatch,
} from "react";
import MenuAppBar from "../components/organisms/menuAppBar";

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


  const theme = createTheme({
    palette: {
      primary: {
        main: isDarkMode ? "#fff4d6" : "#65272b",
        contrastText: "#fff4d6",
      },
      secondary: {
        main: isDarkMode ? "#321315" : "#65272b",
      },
      warning: {
        main: "#ae0d16",
      },
      background: {
        paper: "#65272b",
        default: isDarkMode ? "#46292c" : "#fff4d6",
      },

      type: isDarkMode ? "dark" : "light",
    },
    overrides: {
      MuiPaper: {
        root: {
          backgroundColor: isDarkMode ? "#412b1c" : "#fff4d6",
        },
      },
      MuiInputBase: {
        input: {
          lineHeight: "1.4em",
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <VolumeContext.Provider value={{ setVolume, volume }}>
        <DarkModeContext.Provider value={{ setDarkMode, isDarkMode }}>
          <MenuAppBar />
        </DarkModeContext.Provider>
        <InputMemoContext.Provider value={{ setInputMemo, isInputMemo }}>
          {children}
        </InputMemoContext.Provider>
      </VolumeContext.Provider>
    </ThemeProvider>
  );
}
