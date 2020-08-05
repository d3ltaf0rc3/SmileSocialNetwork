import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const Comment = (props) => {
    return (
        <li className={styles["post-comment"]}>
            <span className={styles["comment-author"]}><Link className={styles.link} to={`/user/${props.author}`}>{props.author}</Link></span> {props.comment}
        </li>
    )
};

export default Comment;