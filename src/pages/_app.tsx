import type { AppProps } from "next/app";
import ThemeButton from "./theme";
import React, {useContext} from "react";
import "../styles/global.scss"
import { StylesProvider } from "@material-ui/core/styles";


export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
    document.querySelector("body")!.classList.add("app-body");
    document.documentElement.setAttribute('timer', 'pause');

  }, []);

  return (
    <StylesProvider injectFirst>
      <ThemeButton>
        <Component {...pageProps} />
      </ThemeButton>
    </StylesProvider>
  );
}
