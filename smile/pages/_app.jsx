import Head from 'next/head';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import NotificationContainer from '../components/notification/container';
import '../styles/globals.css';

config.autoAddCss = false;

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Smile</title>
      </Head>
      <Component {...pageProps} />
      <NotificationContainer />
    </>
  );
};

export default MyApp;
