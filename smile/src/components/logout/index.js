import React, { useContext } from 'react';
import styles from "./index.module.css";
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Context';

const Logout = () => {
    const history = useHistory();
    const context = useContext(AuthContext);

    const clickHandler = (e) => {
        e.preventDefault();
        fetch("http://localhost:7777/api/logout", {
            method: "get",
            credentials: "include"
        })
            .then(() => {
                history.push("/login");
                context.logOut();
            })
            .catch(err => console.log(err));
    };

    return (
        <a onClick={clickHandler} className={styles.link} href="/login">Logout</a>
    )
};

export default Logout;