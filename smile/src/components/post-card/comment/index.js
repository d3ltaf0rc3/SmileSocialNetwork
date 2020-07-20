import React from 'react'
import styles from './index.module.css';

const Comment = (props) => {
    return (
        <li className={styles["post-comment"]}>
            <span className={styles["comment-author"]}>{props.author}</span> {props.comment}
        </li>
    )
};

export default Comment;