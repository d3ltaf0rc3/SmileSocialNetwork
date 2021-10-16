import { useRouter } from 'next/router';
import { useContext } from 'react';
import UserContext from '../../contexts/authContext';
import styles from './index.module.css';

const Footer = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const clickHandler = () => {
    fetch(`${window.location.origin}/api/auth/logout`, {
      method: 'get',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          router.push('/login');
        } else {
          console.error(res.data);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <footer className={styles.footer}>
      <h1 className={styles.copyright}>&copy; 2021 Smile</h1>
      {user ? (
        <button type="button" onClick={clickHandler} className={styles.btn}>
          Logout
        </button>
      ) : null}
    </footer>
  );
};

export default Footer;
