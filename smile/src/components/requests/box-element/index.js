import React, { useContext } from 'react';
import styles from './index.module.css';
import UserContext from '../../../contexts/AuthContext';
import UserData from '../../user-data';
import handleRequest from '../../../utils/handleRequest';

const Request = (props) => {
    const context = useContext(UserContext);

    const acceptRequest = () => {
        handleRequest("accept", props.id, context);
    };

    const declineRequest = () => {
        handleRequest("decline", props.id, context);
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