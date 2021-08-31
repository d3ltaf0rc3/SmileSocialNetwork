import { useContext } from 'react';
import Link from 'next/link';
import styles from './index.module.css';
import Stats from '../stats';
import Avatar from '../../user-avatar';
import UserContext from '../../../contexts/authContext';
import ProfileContext from '../../../contexts/profileContext';

const ProfileHeader = () => {
  const context = useContext(UserContext);
  const profileContext = useContext(ProfileContext);

  const followUser = () => {
    profileActions('follow', profileContext._id, profileContext.triggerUpdate);
  };

  const unfollowUser = () => {
    profileActions('unfollow', profileContext._id, profileContext.triggerUpdate);
  };

  const cancelRequest = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/cancel-request/${profileContext._id}`, {
      method: 'put',
      credentials: 'include',
    })
      .then(() => profileContext.triggerUpdate())
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.header}>
      <Avatar size="150" imageUrl={profileContext.profilePicture} />
      <div className={styles['stats-container']}>
        <div className={styles.title}>
          <h3 className={styles.username}>{profileContext.username}</h3>
          {context.user.username === profileContext.username ? (
            <Link href="/settings">
              <a className={styles.button}>Edit profile</a>
            </Link>
          ) : null}
          {profileContext.doesUserFollow ? (
            <button type="button" onClick={unfollowUser} className={styles.button}>
              Unfollow
            </button>
          ) : (
            <button type="button" onClick={followUser} className={styles.button}>
              Follow
            </button>
          )}
          {profileContext.hasRequested ? (
            <button type="button" onClick={cancelRequest} className={styles.button}>
              Requested
            </button>
          ) : null}
        </div>
        <Stats
          posts={profileContext.posts.length}
          followers={profileContext.followers.length}
          following={profileContext.following.length}
        />

        <div className={styles.bio}>
          <span className={styles['full-name']}>{profileContext.name}</span>
          <pre>{profileContext.description}</pre>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
