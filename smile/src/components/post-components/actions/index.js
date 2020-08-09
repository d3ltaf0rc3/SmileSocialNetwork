import React, { useContext } from 'react';
import styles from './index.module.css';
import commentIcon from '../../../images/comment.svg';
import heartIcon from '../../../images/heart.svg';
import redHeartIcon from '../../../images/redHeart.svg';
import PostContext from '../../../contexts/PostContext';
import UserContext from '../../../contexts/AuthContext';

const PostActions = (props) => {
    const context = useContext(PostContext);
    const user = useContext(UserContext);

    const likePost = () => {
        fetch(`http://localhost:7777/api/posts/like/${context.post._id}`, {
            method: "put",
            credentials: "include"
        })
            .then(() => props.setHasLiked(true))
            .catch(err => console.error(err));
    };

    const unlikePost = () => {
        fetch(`http://localhost:7777/api/posts/unlike/${context.post._id}`, {
            method: "put",
            credentials: "include"
        })
            .then(() => props.setHasLiked(false))
            .catch(err => console.error(err));
    };

    return (
        <div className={styles["post-actions"]}>
            <span>
                {context.post.likes.includes(user.user._id) ?
                    <img src={redHeartIcon} className={styles["post-action"]} alt="heart" onClick={unlikePost} /> :
                    <img src={heartIcon} className={styles["post-action"]} alt="heart" onClick={likePost} />}
            </span>
            <span>
                <label htmlFor={props.imageUrl}><img src={commentIcon} className={styles["post-action"]} alt="comment" /></label>
            </span>
        </div>
    )
};

export default PostActions;