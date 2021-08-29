import { useContext } from 'react';
import UserContext from '../../contexts/authContext';
import styles from './index.module.css';

const Footer = () => {
  const { user, logOut } = useContext(UserContext);

  const clickHandler = () => {
    fetch(`${window.location.origin}/api/auth/logout`, {
      method: 'get',
      credentials: 'include',
    })
      .then(() => logOut())
      .catch(() => logOut());
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
