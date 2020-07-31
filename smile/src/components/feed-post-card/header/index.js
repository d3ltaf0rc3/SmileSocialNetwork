import React from 'react'
import styles from './index.module.css';
import UserData from '../../user-data';

const PostHeader = (props) => {
    return (
        <div className={styles["post-header"]}>
            <UserData imageUrl={props.imageUrl} username={props.username} location={props.location}/>
            {props.children}
        </div>
    )
}

export default PostHeader;