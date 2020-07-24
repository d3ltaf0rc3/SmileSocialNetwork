import React from 'react';
import styles from './index.module.css';

const PostMenu = () => {
    return (
        <div>
            <div className={styles.arrow}></div>
            <div className={styles["menu-box"]}>
                <div className={styles.option}>
                    <span>Edit</span>
                </div>
                <div className={styles.option}>
                    <span>Delete</span>
                </div>
            </div>
        </div>
    )
};

export default PostMenu;