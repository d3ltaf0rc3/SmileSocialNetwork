import React from 'react';
import styles from './index.module.css';

const Stat = (props) => {
    return (
        <li className={styles.stat}>
            <span className={styles["stat-number"]}>{props.number}</span> {props.title}
        </li>
    )
};

export default Stat;