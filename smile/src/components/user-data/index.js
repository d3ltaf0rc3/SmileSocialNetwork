import React from 'react';
import styles from './index.module.css';
import Avatar from '../../components/user-avatar';
import { Link } from 'react-router-dom';

const UserData = (props) => {
    return (
        <Link className={styles.link} to={`/user/${props.username}`}>
            <div className={styles["user-data"]}>
                <Avatar imageUrl={props.imageUrl} size="32" />
                <div className={styles.info}>
                    <span className={styles.username}>{props.username}</span>
                    {props.location ? <span>{props.location}</span> : null}
                </div>
            </div>
        </Link>
    )
};

export default UserData;