import { useContext } from 'react';
import styles from './index.module.css';
import UserContext from '../../contexts/AuthContext';

const Footer = () => {
    const { loggedIn, logOut } = useContext(UserContext);

    const clickHandler = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/user/logout`, {
            method: "get",
            credentials: "include"
        })
            .then(() => logOut())
            .catch(err => console.error(err));
    };

    return (
        <footer className={styles.footer}>
            <h1 className={styles.copyright}>&copy; 2021 Smile</h1>
            {loggedIn ? <button type="button" onClick={clickHandler} className={styles.btn}>Logout</button> : null}
        </footer>
    );
};

export default Footer;