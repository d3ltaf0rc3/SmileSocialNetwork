import React from 'react';
import styles from './index.module.css';
import Comment from '../../feed-post-card/comment';
import Avatar from '../../user-avatar';

const PostComment = (props) => {
    return (
        <div className={styles.comment}>
            <Avatar size="32" imageUrl={props.imageUrl} />
            <Comment author={props.author} comment={props.comment} />
        </div>
    )
};

export default PostComment;