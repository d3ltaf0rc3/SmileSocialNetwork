import React from 'react';
import styles from './index.module.css';
import UserData from '../../feed-post-card/header';
import { Link } from 'react-router-dom';

const Profile = (props) => {
    return (
        <Link className={styles.link} to={`/user/${props.username}`}>
            <div className={styles.container}>
                <UserData location={props.location} imageUrl={props.imageUrl} username={props.username} />
            </div>
        </Link>
    )
};

export default Profile;