import React, { useContext } from 'react';
import styles from "./index.module.css";
import AuthContext from '../../contexts/AuthContext';

const Logout = () => {
    const context = useContext(AuthContext);

    const clickHandler = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/api/logout`, {
            method: "get",
            credentials: "include"
        })
            .then(() => {
                context.logOut();
            })
            .catch(err => console.log(err));
    };

    return (
        <a onClick={clickHandler} className={styles.link} href="/login">Logout</a>
    )
};

export default Logout;