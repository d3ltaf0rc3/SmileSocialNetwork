import React from 'react';
import Logo from '../logo';
import Input from '../input';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import homeIcon from '../../images/home-run.svg';
import heartIcon from '../../images/heart.svg';
import userIcon from '../../images/user.svg';
import addIcon from '../../images/plus.svg';

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Logo />
                <Input name="search" type="text" placeholder="Search" button/>
                <ul className={styles["nav-icons"]}>
                    <li><Link to="/"><img className={styles.icon} src={homeIcon} alt="home" /></Link></li>
                    <li><Link to="/requests"><img className={styles.icon} src={heartIcon} alt="heart" /></Link></li>
                    <li><Link to="/add-post"><img className={styles.icon} src={addIcon} alt="add post" /></Link></li>
                    <li><Link to="/user/lmm_47"><img className={styles.icon} src={userIcon} alt="profile" /></Link></li>
                </ul>
            </nav>
        </header >
    );
};

export default Header;