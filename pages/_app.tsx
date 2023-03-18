import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head children="" />
      <Component {...pageProps} />
    </>
  );
}
