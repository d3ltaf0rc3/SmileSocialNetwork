import React, { useState } from 'react';
import Input from '../input';
import SearchBox from './search-box';

const Search = () => {
    const [displaySearch, setDisplay] = useState(false);

    const displaySearchBox = () => {
        setDisplay(true);
    }

    const hideSearchBox = () => {
        setDisplay(false);
    }


    return (
        <div>
            <Input name="search" onChange={displaySearchBox} type="text" placeholder="Search" />
            {displaySearch ? <SearchBox onMouseLeave={hideSearchBox} /> : null}
        </div>
    )
};

export default Search;