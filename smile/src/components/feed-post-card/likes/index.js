import React from 'react';
import styles from './index.module.css';

const Likes = (props) => {
    return (
        <span className={styles["post-likes"]}>{props.likes} likes</span>
    )
}

export default Likes;