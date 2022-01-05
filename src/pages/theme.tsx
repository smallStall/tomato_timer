import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
} from "react";
import { HistoryProvider } from "hooks/contextProvider/history";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(var(--primary))", //var(--contrast)
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          color: "var(--paper)",
          backgroundColor: "var(--background)",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          ".Mui-checked+.MuiSwitch-track": {
            backgroundColor: "var(--contrast)",
          },
        },
        track: {
          backgroundColor: "var(--contrast) !important", //TODO!important後で外す
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          border: "none",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
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
  },
});

type Props = {
  children: React.ReactNode;
};
export const VolumeContext = createContext<{
  setVolume: Dispatch<SetStateAction<number>>;
  volume: number;
}>({ setVolume: () => {}, volume: 0 });

export const CountContext = createContext<{
  setCount: Dispatch<SetStateAction<string>>;
  count: string;
}>({ setCount: () => {}, count: "" });

export default function Theme({ children }: Props) {
  const [volume, setVolume] = useState(1);
  const [count, setCount] = useState("1コ目");
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <VolumeContext.Provider value={{ setVolume, volume }}>
          <CountContext.Provider value={{ setCount, count }}>
            <HistoryProvider>{children}</HistoryProvider>
          </CountContext.Provider>
        </VolumeContext.Provider>
      </ThemeProvider>
    </>
  );
}
