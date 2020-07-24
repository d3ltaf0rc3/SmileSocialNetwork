import React from 'react';
import styles from './index.module.css';
import UserData from '../../feed-post-card/header';
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <Link className={styles.link} to="/user/lmm_47">
            <div className={styles.container}>
                <UserData />
            </div>
        </Link>
    )
};

export default Profile;