import React, { useContext } from 'react';
import styles from './index.module.css';
import Stats from '../stats';
import Avatar from '../../user-avatar';
import { Link } from 'react-router-dom';
import UserContext from '../../../contexts/AuthContext';
import ProfileContext from '../../../contexts/ProfileContext';

const ProfileHeader = () => {
    const context = useContext(UserContext);
    const profileContext = useContext(ProfileContext);

    return (
        <div className={styles.header}>
            <Avatar size="150" imageUrl={profileContext.profilePicture} />

            <div className={styles["stats-container"]}>
                <div className={styles.title}>
                    <h3 className={styles.username}>{profileContext.username}</h3>
                    {context.user.username === profileContext.username ?
                        <Link className={styles.button} to="/settings">Edit profile</Link> :
                        <button className={styles.button}>Follow</button>}
                </div>

                <Stats
                    posts={profileContext.posts.length}
                    followers={profileContext.followers.length}
                    following={profileContext.following.length} />

                <div className={styles.bio}>
                    <span className={styles["full-name"]}>
                        {profileContext.name}
                    </span>
                    <pre>{profileContext.description}</pre>
                </div>
            </div>
        </div>
    )
};

export default ProfileHeader;