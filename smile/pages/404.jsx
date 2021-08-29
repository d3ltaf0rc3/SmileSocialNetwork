import { useContext } from 'react';
import Link from 'next/link';
import Header from '../components/header';
import Footer from '../components/footer';
import AuthContext from '../contexts/authContext';
import styles from '../styles/error.module.css';

const ErrorPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? <Header /> : null}
      <div className={styles.container}>
        <h1>Sorry, this page isn&apos;t available.</h1>
        <p>
          The link you followed may be broken, or the page may have been removed.{' '}
          <Link href={user ? '/' : '/login'}>
            <a className={styles.link}>Go back to Smile.</a>
          </Link>
        </p>
      </div>
      {user ? <Footer /> : null}
    </>
  );
};

export default ErrorPage;
