import { useState, useEffect } from 'react';
import Input from '../input';
import SearchBox from './search-box';
import styles from './index.module.css';

const Search = () => {
  const [displaySearch, setDisplay] = useState(false);
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        fetch(`${window.location.origin}/api/user/search?query=${query}`)
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
    }, 1000);

    return () => {
      if (users !== null) {
        setUsers(null);
      }
      clearTimeout(timeoutId);
    };
  }, [query]);

  const handleChange = (e) => {
    if (!displaySearch) {
      setDisplay(true);
    }

    const inputValue = e.target.value.trim().replace(/[^\w.]/gim, '');
    setQuery(inputValue);
  };

  return (
    <div className={styles.container}>
      <Input
        value={query}
        name="search"
        onChange={handleChange}
        onFocus={() => setDisplay(true)}
        placeholder="Search"
      />
      {displaySearch ? <SearchBox users={users} onMouseLeave={() => setDisplay(false)} /> : null}
    </div>
  );
};

export default Search;
