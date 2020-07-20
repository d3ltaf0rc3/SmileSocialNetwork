import React from 'react'
import styles from './index.module.css';
import commentIcon from '../../../images/comment.svg';
import heartIcon from '../../../images/heart.svg';

const PostActions = () => {
    return (
        <div className={styles["post-actions"]}>
            <span>
                <img src={heartIcon} className={styles["post-action"]} alt="heart" />
            </span>
            <span>
                <img src={commentIcon} className={styles["post-action"]} alt="comment" />
            </span>
        </div>
    )
};

export default PostActions;