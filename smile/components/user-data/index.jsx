import Link from 'next/link';
import styles from './index.module.css';
import Avatar from '../user-avatar';

const UserData = ({ username, imageUrl, location }) => {
  return (
    <Link href={`/user/${username}`}>
      <a className={styles.link}>
        <div className={styles['user-data']}>
          <Avatar imageUrl={imageUrl} size="32" />
          <div className={styles.info}>
            <span className={styles.username}>{username}</span>
            {location ? <span>{location}</span> : null}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default UserData;
