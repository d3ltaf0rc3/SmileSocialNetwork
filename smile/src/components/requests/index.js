import React from 'react';
import styles from './index.module.css';
import heartIcon from '../../images/heart.svg';

const Requests = () => {
    return (
        <div>
            <img className={styles.icon} src={heartIcon} alt="heart" />
        </div>
    )
}

export default Requests;