import React, { useContext } from 'react';
import styles from './index.module.css';
import commentIcon from '../../../images/comment.svg';
import heartIcon from '../../../images/heart.svg';
import redHeartIcon from '../../../images/redHeart.svg';
import UserContext from '../../../contexts/AuthContext';

const PostActions = (props) => {
    const context = useContext(UserContext);

    const likePost = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/posts/like/${props.id}`, {
            method: "put",
            credentials: "include"
        })
            .then(() => props.setUpdate())
            .catch(err => console.error(err));
    };

    const unlikePost = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/posts/unlike/${props.id}`, {
            method: "put",
            credentials: "include"
        })
            .then(() => props.setUpdate())
            .catch(err => console.error(err));
    };

    return (
        <div className={styles["post-actions"]}>
            <span>
                {!context.user ?
                    <img src={heartIcon} className={styles["post-action"]} alt="heart" onClick={likePost} /> :
                    props.likes.includes(context.user._id) ?
                        <img src={redHeartIcon} className={styles["post-action"]} alt="heart" onClick={unlikePost} /> :
                        <img src={heartIcon} className={styles["post-action"]} alt="heart" onClick={likePost} />}
            </span>
            <span>
                <label htmlFor={props.id}><img src={commentIcon} className={styles["post-action"]} alt="comment" /></label>
            </span>
        </div>
    )
};

export default PostActions;