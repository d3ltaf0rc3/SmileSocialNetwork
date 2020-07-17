import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import homeIcon from '../../images/home-run.svg';
import heartIcon from '../../images/heart.svg';
import userIcon from '../../images/user.svg';
import arrow from '../../images/next.svg';

const Header = () => {
    const history = useHistory();

    const routeChange = () => {
        history.push("/search");
    };

    return (
        <header>
            <nav>
                <div className={styles.logo}>
                    <a href="/"><h1>Smile</h1></a>
                </div>
                <div className={styles["input-container"]}>
                    <input className={styles["custom-input"]} type="text" placeholder="Search" />
                    <button onClick={routeChange} className={styles["custom-input-button"]}>
                        <img src={arrow} />
                    </button>
                </div>
                <div className={styles["nav-icons"]}>
                    <ul>
                        <li><img className={styles.icon} src={homeIcon} alt="home" /></li>
                        <li><img className={styles.icon} src={heartIcon} alt="home" /></li>
                        <li><img className={styles.icon} src={userIcon} alt="home" /></li>
                    </ul>
                </div>
            </nav>
        </header >
    );
};

export default Header;