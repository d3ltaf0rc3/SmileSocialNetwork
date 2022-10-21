import { useContext } from 'react';
import Link from 'next/link';
import Stats from '../../stats';
import ProfileContext from '../../../../contexts/profileContext';
import AuthContext from '../../../../contexts/authContext';
import styles from './index.module.css';

const InfoSection = ({ notify }) => {
  const profile = useContext(ProfileContext);
  const user = useContext(AuthContext);

  const handleAction = (action) => {
    fetch('/api/user/handleAction', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        id: profile._id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          profile.updateProfile();
        } else {
          notify(res.data, { type: 'failure' });
        }
      })
      .catch(() => notify('Something went wrong!', { type: 'failure' }));
  };

  const hasRequested = profile.hasRequested ? (
    <button type="button" onClick={() => handleAction('cancel-request')} className={styles.button}>
      Requested
    </button>
  ) : (
    <button type="button" onClick={() => handleAction('follow')} className={styles.button}>
      Follow
    </button>
  );

  const doesFollow = profile.doesFollow ? (
    <button type="button" onClick={() => handleAction('unfollow')} className={styles.button}>
      Unfollow
    </button>
  ) : (
    hasRequested
  );

  const buttonEval = user.username === profile.username ? (
    <Link href="/settings">
      <a className={styles.button}>Edit profile</a>
    </Link>
  ) : (
    doesFollow
  );

  return (
    <div className={styles.infoContainer}>
      <div className={styles.title}>
        <h6 className={styles.username}>{profile.username}</h6>
        {buttonEval}
      </div>
      <Stats posts={profile.posts} followers={profile.followers} following={profile.following} />
      <div className={styles.bio}>
        <p className={styles.name}>{profile.name}</p>
        <pre>{profile.description}</pre>
      </div>
    </div>
  );
};

export default InfoSection;
