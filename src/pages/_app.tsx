import type { AppProps } from "next/app";
import React from "react";
import "./_app.scss"
import { StyledEngineProvider } from '@mui/material/styles';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
    document.querySelector("body")!.classList.add("app-body");
    document.documentElement.setAttribute('timer', 'pause');

  }, []);

  return (
    <StyledEngineProvider injectFirst>
        <Component {...pageProps} />
    </StyledEngineProvider>
  );
}
