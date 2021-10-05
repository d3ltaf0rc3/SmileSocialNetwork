import { useEffect, useState } from 'react';
import Image from 'next/image';
import Profile from '../result-profile';
import styles from './index.module.css';

const Search = ({ query, onMouseLeave }) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (query !== '') {
      fetch(`${window.location.origin}/api/user/search`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setUsers(res.data);
          } else {
            console.error(res.data);
            setUsers([]);
          }
        })
        .catch((err) => console.error(err));
    } else {
      setUsers([]);
    }
  }, [query]);

  if (users === null) {
    return (
      <div className={styles.container} onMouseLeave={onMouseLeave}>
        <div className={styles.arrow} />
        <div style={{ textAlign: 'center', padding: '5px 0' }} className={styles.searchBox}>
          <Image src="/loading.svg" width="50" height="50" alt="loading" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} onMouseLeave={onMouseLeave}>
      <div className={styles.arrow} />
      <div className={styles.searchBox}>
        {users.length > 0 ? users.map((user) => (
          <Profile
            key={user._id}
            username={user.username}
            imageUrl={user.profilePicture}
          />
        )) : (
          <div className={styles.error}>No results found</div>
        )}
      </div>
    </div>
  );
};

export default Search;
