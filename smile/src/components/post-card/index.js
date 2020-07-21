import React from 'react';
import styles from './index.module.css';
import PostHeader from './header';
import Comment from './comment';
import PostActions from './actions';
import AddComment from './add-comment';

const Post = (props) => {
    return (
        <div className={styles.card}>
            <PostHeader />
            <img className={styles["post-image"]} src={props.imageUrl} alt="post" />
            <div className={styles["post-info"]}>
                <PostActions />
                <span className={styles["post-likes"]}>147 likes</span>
                <ul className={styles["post-comments"]}>
                    <Comment author="marinov_m" comment="Beautiful"/>
                </ul>
                <AddComment />
            </div>
        </div>
    )
}

export default Post;