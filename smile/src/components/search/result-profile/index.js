import React from 'react';
import styles from './index.module.css';
import UserData from '../../feed-post-card/header';

const Profile = (props) => {
    return (
        <div className={styles.container}>
            <UserData location={props.location} imageUrl={props.imageUrl} username={props.username} />
        </div>
    )
};

export default Profile;