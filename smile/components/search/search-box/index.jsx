import { useEffect, useState } from 'react';
import styles from './index.module.css';
import Profile from '../result-profile';

const Search = ({ query, onMouseLeave }) => {
  const [users, setUsers] = useState();

  useEffect(() => {
    if (query.trim() !== '') {
      fetch(`${process.env.REACT_APP_API_URL}/api/user/search`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          query: query.trim(),
        }),
      })
        .then((res) => res.json())
        .then((usrs) => setUsers(usrs))
        .catch((err) => console.error(err));
    } else {
      setUsers([]);
    }
  }, [query]);

  return (
    <div onMouseLeave={onMouseLeave}>
      <div className={styles.arrow} />
      <div className={styles['search-box']}>
        {users === undefined ? <div className={styles.error}>Loading...</div> : null}
        {users.length > 0 ? (
          users.map((user) => {
            return (
              <Profile
                key={user.username}
                location={user.name}
                username={user.username}
                imageUrl={user.profilePicture}
              />
            );
          })
        ) : (
          <div className={styles.error}>No results found</div>
        )}
      </div>
    </div>
  );
};

export default Search;
