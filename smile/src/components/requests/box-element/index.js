import React from 'react';
import styles from './index.module.css';
import UserData from '../../user-data';

const Request = () => {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <UserData />
                <span className={styles.span}>has requested to follow you.</span>
            </div>
            <div className={styles.btns}>
                <button className={styles.btn}>Accept</button>
                <button className={`${styles.btn} ${styles.remove}`}>Decline</button>
            </div>
        </div>
    )
};

export default Request;