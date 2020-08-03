import React, { useState } from 'react';
import styles from './index.module.css';
import commentIcon from '../../../images/comment.svg';
import heartIcon from '../../../images/heart.svg';
import redHeartIcon from '../../../images/redHeart.svg';

const PostActions = (props) => {
    const [hasLiked, setState] = useState(false);

    const changeIcon = () => {
        setState(!hasLiked);
    };

    return (
        <div className={styles["post-actions"]}>
            <span>
                <img src={hasLiked ? redHeartIcon : heartIcon} className={styles["post-action"]} alt="heart" onClick={changeIcon} />
            </span>
            <span>
                <label htmlFor={props.imageUrl}><img src={commentIcon} className={styles["post-action"]} alt="comment" /></label>
            </span>
        </div>
    )
};

export default PostActions;