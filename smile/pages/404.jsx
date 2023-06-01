import Link from 'next/link';
import styles from '../styles/error.module.css';

const ErrorPage = () => {
  return (
    <div className={styles.container}>
      <h1>Sorry, this page isn&apos;t available.</h1>
      <p>
        The link you followed may be broken, or the page may have been removed.{' '}
        <Link className={styles.link} href="/">
          Go back to Smile.
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
