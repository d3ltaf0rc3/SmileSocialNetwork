import React from 'react';
import styles from './index.module.css';
import Profile from './result-profile';

const Search = (props) => {
    return (
        <div onMouseLeave={props.onMouseLeave}>
            <div className={styles.arrow}></div>
            <div className={styles["search-box"]}>
                <Profile />
                <Profile />
                <Profile />
            </div>
        </div>
    )
};

export default Search;