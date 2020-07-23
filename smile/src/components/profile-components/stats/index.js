import React from 'react';
import styles from './index.module.css';

const Stat = (props) => {
    return (
        <ul className={styles.stats}>
            <li className={styles.stat}>
                <span className={styles["stat-number"]}>{props.posts}</span> posts
            </li>
            <li className={styles.stat}>
                <span className={styles["stat-number"]}>{props.followers}</span> followers
            </li>
            <li className={styles.stat}>
                <span className={styles["stat-number"]}>{props.following}</span> following
            </li>
        </ul>
    )
};

export default Stat;