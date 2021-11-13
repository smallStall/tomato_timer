import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React, {
  useState,
  useEffect,
  createContext,
  SetStateAction,
  Dispatch,
} from "react";


const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(var(--warning))", //"#ae0d16",
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        color: `var(--paper)`,
        backgroundColor: `var(--background)`,
      },
    },
    MuiInput: {
      underline: {
        "&::before": {
          borderBottom: "1px solid var(--primary)",
          borderBottomColor: "var(--primary)",
          transition:
            "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
    },
  },
});

type Props = {
  children: React.ReactNode;
};
export const VolumeContext = createContext<{
  setVolume: Dispatch<SetStateAction<number>>;
  volume: number;
}>({ setVolume: () => {}, volume: 0 });

export const MobileContext = createContext<{
  setMobile: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
}>({ setMobile: () => {}, isMobile: false });

export default function Theme({ children }: Props) {
  const [volume, setVolume] = useState(100);
  const [isMobile, setMobile] = useState(false);
  useEffect(() => {
    setMobile(
      window.matchMedia &&
        window.matchMedia("(max-device-width: 640px)").matches
    );
  }, []);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <VolumeContext.Provider value={{ setVolume, volume }}>
          <MobileContext.Provider value={{ setMobile, isMobile }}>
            {children}
          </MobileContext.Provider>
        </VolumeContext.Provider>
      </ThemeProvider>
    </>
  );
}
