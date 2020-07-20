import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const Footer = () => {
    return (
        <footer>
            <h1 className={styles.copyright}>&copy; 2020 Smile</h1>
            <Link to="/" className={styles["home-link"]}>Home</Link>
        </footer>
    );
};

export default Footer;