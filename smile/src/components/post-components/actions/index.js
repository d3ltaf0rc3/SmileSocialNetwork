import React, { useContext } from 'react';
import styles from './index.module.css';
import commentIcon from '../../../images/comment.svg';
import heartIcon from '../../../images/heart.svg';
import redHeartIcon from '../../../images/redHeart.svg';
import PostContext from '../../../contexts/PostContext';
import UserContext from '../../../contexts/AuthContext';

const PostActions = (props) => {
    const post = useContext(PostContext);
    const user = useContext(UserContext);

    const likePost = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/posts/like/${post._id}`, {
            method: "put",
            credentials: "include"
        })
            .then(() => props.setUpdate())
            .catch(err => console.error(err));
    };

    const unlikePost = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/posts/unlike/${post._id}`, {
            method: "put",
            credentials: "include"
        })
            .then(() => props.setUpdate())
            .catch(err => console.error(err));
    };

    return (
        <div className={styles["post-actions"]}>
            <span>
                {post.likes.includes(user.user._id) ?
                    <img src={redHeartIcon} className={styles["post-action"]} alt="heart" onClick={unlikePost} /> :
                    <img src={heartIcon} className={styles["post-action"]} alt="heart" onClick={likePost} />}
            </span>
            <span>
                <label htmlFor={post._id}><img src={commentIcon} className={styles["post-action"]} alt="comment" /></label>
            </span>
        </div>
    )
};

export default PostActions;