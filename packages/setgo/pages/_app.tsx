import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Layout } from '../components/layout.component';
import { darkTheme, GlobalStyle } from '../styles';
import { FontFaces } from '../styles/global/font-faces.global';
import { Preflight } from '../styles/global/preflight.global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Preflight />
      <FontFaces />
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />

        <Head>
          <meta name="robots" content="noindex, nofollow, nosnippet" />

          <meta
            key="theme-light"
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content="#f5f5f5"
          />
          <meta
            key="theme-dark"
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content="#212121"
          />

          <link
            rel="preload"
            href="/fonts/raleway/variable/WOFF2/Raleway-VF.woff2"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/raleway/variable/WOFF2/Raleway-Italic-VF.woff2"
            as="font"
            crossOrigin=""
          />
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
export default MyApp;
