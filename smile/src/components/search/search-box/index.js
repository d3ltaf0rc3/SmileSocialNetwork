import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import Profile from '../result-profile';

const Search = (props) => {
    const [users, setUsers] = useState();

    useEffect(() => {
        if (props.query !== "") {
            fetch(`http://localhost:7777/api/search?q=${props.query}`)
                .then(res => res.json())
                .then(users => setUsers(users))
                .catch(err => console.error(err));
        } else {
            setUsers([]);
        }
    }, [props.query]);

    return (
        <div onMouseLeave={props.onMouseLeave}>
            <div className={styles.arrow}></div>
            <div className={styles["search-box"]}>
                {users === undefined ?
                    <div className={styles.error}>Loading...</div> :
                    users.length > 0 ?
                        users.map(user => {
                            return <Profile key={user.username} location={user.name} username={user.username} imageUrl={user.profilePicture} />
                        }) :
                        <div className={styles.error}>No results found</div>}
            </div>
        </div>
    )
};

export default Search;