import Image from 'next/image';
import Profile from '../result-profile';
import styles from './index.module.css';

const Search = ({ users, onMouseLeave }) => {
  if (users === null) {
    return (
      <div className={styles.container} onMouseLeave={onMouseLeave}>
        <div className={styles.arrow} />
        <div className={`${styles.searchBox} ${styles.loading}`}>
          <Image src="/loading.svg" width="50" height="50" alt="loading" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} onMouseLeave={onMouseLeave}>
      <div className={styles.arrow} />
      <div className={styles.searchBox}>
        {users.length > 0 ? (
          users.map((user) => (
            <Profile key={user._id} username={user.username} imageUrl={user.profilePicture} />
          ))
        ) : (
          <div className={styles.error}>No results found</div>
        )}
      </div>
    </div>
  );
};

export default Search;
