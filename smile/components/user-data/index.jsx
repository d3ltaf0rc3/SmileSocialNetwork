import Link from 'next/link';
import Avatar from '../avatar';
import styles from './index.module.css';

const UserData = ({ username, imageUrl, location = null }) => {
  return (
    <Link className={styles.link} href={`/user/${username}`}>
      <Avatar src={imageUrl} size="32" />
      <div className={styles.info}>
        <p className={styles.username}>{username}</p>
        {location ? <p className={styles.location}>{location}</p> : null}
      </div>
    </Link>
  );
};

export default UserData;
