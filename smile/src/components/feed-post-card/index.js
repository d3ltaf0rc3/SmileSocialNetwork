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
            <PostHeader />
            <img className={styles["post-image"]} src={props.imageUrl} alt="post" />
            
            <div className={styles["post-info"]}>
                <PostActions imageUrl={props.imageUrl} />
                <Likes />
                <CommentSection />
                <AddComment imageUrl={props.imageUrl} />
            </div>
        </div>
    )
}

export default PostCard;