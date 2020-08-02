import React, { useContext } from 'react';
import Logo from '../logo';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import homeIcon from '../../images/home-run.svg';
import userIcon from '../../images/user.svg';
import addIcon from '../../images/plus.svg';
import Search from '../search';
import Requests from '../requests';
import AuthContext from '../../contexts/AuthContext';

const Header = () => {
    const context = useContext(AuthContext);

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Logo />
                <Search />
                <ul className={styles["nav-icons"]}>
                    <li><Link to="/"><img className={styles.icon} src={homeIcon} alt="home" /></Link></li>
                    <li><Requests /></li>
                    <li><Link to="/add-post"><img className={styles.icon} src={addIcon} alt="add post" /></Link></li>
                    <li>{context.user === null ? <img className={styles.icon} src={userIcon} alt="profile" />: <Link to={`/user/${context.user.username}`}><img className={styles.icon} src={userIcon} alt="profile" /></Link>}</li>
                </ul>
            </nav>
        </header >
    );
};

export default Header;