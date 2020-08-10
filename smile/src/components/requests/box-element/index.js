import React, { useContext } from 'react';
import styles from './index.module.css';
import UserContext from '../../../contexts/AuthContext';
import UserData from '../../user-data';

const Request = (props) => {
    const context = useContext(UserContext);

    const acceptRequest = () => {
        fetch("http://localhost:7777/api/handle-request", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                action: "accept",
                username: props.username
            })
        })
            .then(() => context.triggerUpdate())
            .catch(err => console.log(err));
    };

    const declineRequest = () => {
        fetch("http://localhost:7777/api/handle-request", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                action: "decline",
                username: props.username
            })
        })
            .then(() => context.triggerUpdate())
            .catch(err => console.log(err));
    };

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <UserData imageUrl={props.imageUrl} username={props.username} />
                <span className={styles.span}>has requested to follow you.</span>
            </div>
            <div className={styles.btns}>
                <button onClick={acceptRequest} className={styles.btn}>Accept</button>
                <button onClick={declineRequest} className={`${styles.btn} ${styles.remove}`}>Decline</button>
            </div>
        </div>
    )
};

export default Request;