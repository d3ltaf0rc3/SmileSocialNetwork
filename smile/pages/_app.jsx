import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import AuthContext from '../contexts/authContext';
import Spinner from '../components/loading/spinner';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [user, setUser] = useState();
  const noAuthRoutes = ['/login', '/register', '/error'];

  const logIn = (usr) => {
    setUser(usr);
  };

  const logOut = () => {
    setUser(null);
    if (!noAuthRoutes.includes(router.pathname)) {
      router.push('/login');
    }
  };

  useEffect(() => {
    fetch(`${window.location.origin}/api/user/verifySession`, {
      method: 'get',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          logIn(res.data);
        } else {
          logOut();
        }
      })
      .catch(() => logOut());
  }, []);

  if (user === undefined) {
    return <Spinner withWrapper />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        logIn,
        logOut,
      }}
    >
      <Head>
        <title>Smile</title>
      </Head>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
};

export default MyApp;
