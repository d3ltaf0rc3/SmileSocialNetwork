import React from 'react';
import styles from './index.module.css';
import PostHeader from './header';
import CommentSection from './comment-section';
import PostActions from './actions';
import AddComment from './add-comment';
import Likes from './likes';

const PostCard = (props) => {
    return (
        <div className={styles.card}>
            <PostHeader username={props.username} location={props.location} imageUrl={props.profilePicture} />
            <img className={styles["post-image"]} src={props.imageUrl} alt="post" />

            <div className={styles["post-info"]}>
                <PostActions imageUrl={props.imageUrl} />
                <Likes likes={props.likes} />
                <CommentSection comments={props.comments} />
                <AddComment imageUrl={props.imageUrl} />
            </div>
        </div>
    )
}

export default PostCard;