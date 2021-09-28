import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeButton from "./theme";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <>
      <ThemeButton>
        <Component {...pageProps} />
      </ThemeButton>
    </>
  );
}
