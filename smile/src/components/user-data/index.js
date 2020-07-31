import React from 'react';
import styles from './index.module.css';
import Avatar from '../../components/user-avatar';

const UserData = (props) => {
    return (
        <div className={styles["user-data"]}>
            <Avatar imageUrl={props.imageUrl} size="32" />
            <div className={styles.info}>
                <span className={styles.username}>{props.username}</span>
                {props.location ? <span>{props.location}</span> : null}
            </div>
        </div>
    )
};

export default UserData;