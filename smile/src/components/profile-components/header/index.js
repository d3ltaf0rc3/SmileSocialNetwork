import { useContext } from 'react';
import styles from './index.module.css';
import Stats from '../stats';
import Avatar from '../../user-avatar';
import { Link } from 'react-router-dom';
import UserContext from '../../../contexts/AuthContext';
import ProfileContext from '../../../contexts/ProfileContext';
import profileActions from '../../../utils/profileActions';

const ProfileHeader = () => {
    const context = useContext(UserContext);
    const profileContext = useContext(ProfileContext);

    const followUser = () => {
        profileActions("follow", profileContext._id, profileContext.triggerUpdate);
    };

    const unfollowUser = () => {
        profileActions("unfollow", profileContext._id, profileContext.triggerUpdate);
    };

    const cancelRequest = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/user/cancel-request/${profileContext._id}`, {
            method: "put",
            credentials: "include"
        })
            .then(() => profileContext.triggerUpdate())
            .catch(err => console.log(err));
    };

    return (
        <div className={styles.header}>
            <Avatar size="150" imageUrl={profileContext.profilePicture} />
            <div className={styles["stats-container"]}>
                <div className={styles.title}>
                    <h3 className={styles.username}>{profileContext.username}</h3>
                    {context.user.username === profileContext.username ?
                        <Link className={styles.button} to="/account/settings">Edit profile</Link> :
                        profileContext.doesUserFollow ? <button onClick={unfollowUser} className={styles.button}>Unfollow</button> :
                            profileContext.requests.some(user => user.username === context.user.username) ? <button onClick={cancelRequest} className={styles.button}>Requested</button> : <button onClick={followUser} className={styles.button}>Follow</button>}
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