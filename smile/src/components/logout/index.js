import React from 'react';
import styles from "./index.module.css";
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();

    const clickHandler = (e) => {
        e.preventDefault()
        fetch("http://localhost:7777/api/logout", {
            method: "get",
            credentials: "include"
        })
            .then(() => history.push("/login"))
            .catch(err => console.log(err))
    }

    return (
        <a onClick={clickHandler} className={styles.link} href="/login">Logout</a>
    )
};

export default Logout;