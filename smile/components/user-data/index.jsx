import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.css';

const UserData = ({ username, imageUrl, location = null }) => {
  return (
    <Link href={`/user/${username}`}>
      <a className={styles.link}>
        <Image src={imageUrl} width="32" height="32" alt="user" />
        <div className={styles.info}>
          <p className={styles.username}>{username}</p>
          {location ? <p className={styles.location}>{location}</p> : null}
        </div>
      </a>
    </Link>
  );
};

export default UserData;
