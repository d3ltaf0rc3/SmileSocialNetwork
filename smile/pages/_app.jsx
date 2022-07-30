import Head from 'next/head';
import { useState } from 'react';
import NotificationContainer from '../components/notification/container';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  const [notification, setNotification] = useState(null);

  const remove = () => {
    if (notification) {
      clearTimeout(notification.timeout);
    }
    setNotification(null);
  };

  const notify = (message, options) => {
    if (notification) {
      clearTimeout(notification.timeout);
    }
    const timeout = setTimeout(remove, 5000);
    setNotification({ message, timeout, ...options });
  };

  return (
    <>
      <Head>
        <title>Smile</title>
      </Head>
      <Component {...pageProps} notify={notify} />
      <NotificationContainer notification={notification} />
    </>
  );
};

export default MyApp;
