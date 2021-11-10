if (typeof window != 'undefined') {
  console.log(window.document);
}
import Head from 'next/head';
import { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BaseContainer } from '@/components';
import theme from '@/theme';

export function reportWebVitals(metric) {
  console.log(metric);
};

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if(jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Innerspace</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BaseContainer>
          <Component {...pageProps} />
        </BaseContainer>
      </ThemeProvider>
    </React.Fragment>
  );
}
