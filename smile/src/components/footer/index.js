import React from 'react';
import styles from './index.module.css';
import Logout from '../logout';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <h1 className={styles.copyright}>&copy; 2020 Smile</h1>
            {document.cookie ? <Logout /> : null}
        </footer>
    );
};

export default Footer;