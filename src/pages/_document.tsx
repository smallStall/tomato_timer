import React from "react";
// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import ServerStyleSheets from "@mui/styles/ServerStyleSheets";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          {/* PWA primary color */}
          {/*<meta name="theme-color" content={theme.palette.primary.main} />*/}
          <link rel="canonical" href="https://pomodoro-tech-timer.com" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicons/safari-pinned-tab.svg"
            color="#000000"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={"/favicons/favicon-32x32.png"}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={"/favicons/favicon-16x16.png"}
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&family=Zen+Kaku+Gothic+New:wght@500&display=swap"
            rel="stylesheet"
          />
          <meta
            name="description"
            content="webで使うタイムボックス用のタイマーです。トマトが動く可愛らしいタイマーです。スタートして25分後にタイマーが鳴り、その5分後にまたタイマーが鳴ります。"
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="small_s_tall" />
          <meta name="twitter:title" content="トマト・タイマー" />
          <meta name="twitter:description" content="トマトが動くタイマーです。25分と5分のお知らせを交互に繰り返します。音が鳴ります。" />
          <meta name="twitter:image" content="https://pomodoro-tech-timer.com//twitter-card.png" />
          <meta name="google-site-verification" content="bJf1jv13RsQyj9WdeIOc4FJ8kOW_kx8dkklcn9ms_6I" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-config"
            content="/favicons/browserconfig.xml"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  // `getInitialProps` belongs to `_document` (instead of `_app`),
  // it's compatible with server-side generation (SSG).
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        // eslint-disable-next-line react/display-name
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }
}
