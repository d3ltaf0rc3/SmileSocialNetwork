import { useState } from 'react';
import Input from '../input';
import SearchBox from './search-box';
import styles from './index.module.css';

const Search = () => {
  const [displaySearch, setDisplay] = useState(false);
  const [query, setQuery] = useState();

  return (
    <div className={styles.container}>
      <Input
        name="search"
        onChange={(e) => {
          setDisplay(true);
          setQuery(e.target.value.trim());
        }}
        type="text"
        placeholder="Search"
      />
      {displaySearch ? <SearchBox query={query} onMouseLeave={() => setDisplay(false)} /> : null}
    </div>
  );
};

export default Search;
