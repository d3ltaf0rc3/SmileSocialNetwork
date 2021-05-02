import React, { useContext } from 'react';
import styles from './index.module.css';
import Logout from '../logout';
import UserContext from '../../contexts/AuthContext';

const Footer = () => {
    const { loggedIn } = useContext(UserContext);

    return (
        <footer className={styles.footer}>
            <h1 className={styles.copyright}>&copy; 2021 Smile</h1>
            {loggedIn ? <Logout /> : null}
        </footer>
    );
};

export default Footer;