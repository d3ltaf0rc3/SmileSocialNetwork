import React, { useContext } from 'react';
import styles from './index.module.css';
import Request from '../box-element';
import UserContext from '../../../contexts/AuthContext';

const RequestsBox = (props) => {
    const context = useContext(UserContext);

    if (!context.user) {
        return <div></div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.arrow}></div>
            <div className={styles.box}>
                {context.user.requests.length === 0 ?
                    <div className={styles.error}>When people ask to follow you, you'll see their requests here.</div> :
                    context.user.requests.map(req => <Request
                        username={req.username}
                        imageUrl={req.profilePicture}
                        key={req._id} />)}
            </div>
        </div>
    )
};

export default RequestsBox;