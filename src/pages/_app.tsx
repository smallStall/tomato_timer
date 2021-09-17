import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import ThemeButton from './theme'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])

  return (
    <>
      <Head>
        <title>MyApp</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeButton>
        <Component {...pageProps} />
      </ThemeButton>
    </>
  )
}
