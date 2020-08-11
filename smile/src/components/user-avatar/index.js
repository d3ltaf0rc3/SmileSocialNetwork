import React from 'react';
import styles from './index.module.css';

const Avatar = (props) => {
    return (
        <img
            src={props.imageUrl}
            className={props.size === "32" ? styles.smallImage : styles.bigImage}
            alt="user" />
    )
};

export default Avatar;