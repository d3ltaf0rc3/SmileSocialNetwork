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
            <img className={styles["post-image"]} src="https://scontent.fpdv1-1.fna.fbcdn.net/v/t31.0-8/27503775_1180394138762784_345829292824939629_o.jpg?_nc_cat=110&_nc_sid=0debeb&_nc_ohc=gIYKPmMFfEMAX-y__Gh&_nc_ht=scontent.fpdv1-1.fna&oh=bfe878ff5e818d3010003b82e0d00fa5&oe=5F3A0C5F" alt="post" />
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