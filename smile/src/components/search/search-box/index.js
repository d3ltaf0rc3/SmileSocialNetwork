import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import Profile from '../result-profile';

const Search = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (props.query !== "") {
            fetch(`http://localhost:7777/api/search/${props.query}`)
            .then(res => res.json())
            .then(users => setUsers(users))
            .catch(err => console.error(err));
        }
    }, [props.query]);

    if (JSON.stringify(users) !== JSON.stringify([])) {
        return (
            <div onMouseLeave={props.onMouseLeave}>
                <div className={styles.arrow}></div>
                <div className={styles["search-box"]}>
                    {users.map(user => {
                        return <Profile key={user.username} location={user.name} username={user.username} imageUrl={user.profilePicture} />
                    })}
                </div>
            </div>
        )
    } else {
        return null
    }
};

export default Search;