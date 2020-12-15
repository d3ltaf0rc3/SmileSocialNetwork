import React, { useContext } from 'react';
import styles from './index.module.css';
import Actions from '../actions';
import AddComment from '../../add-comment';
import Likes from '../../feed-post-card/likes';
import PostComment from '../post-comment';
import PostContext from '../../../contexts/PostContext';

const SideContent = (props) => {
    const post = useContext(PostContext);

    return (
        <div className={styles.content}>
            <ul className={styles["comment-section"]}>
                {post.description ?
                    <PostComment
                        imageUrl={post.postedBy.profilePicture}
                        author={post.postedBy.username}
                        comment={post.description} /> : null}
                {post.comments.map(comment =>
                    <PostComment
                        key={comment._id}
                        imageUrl={comment.postedBy.profilePicture}
                        author={comment.postedBy.username}
                        comment={comment.comment} />)}
            </ul>

            <section className={styles.actions}>
                <Actions setUpdate={props.setUpdate} />
                <Likes likes={post.likes.length} />
                <AddComment setUpdate={props.setUpdate} id={post._id} />
            </section>
        </div>
    )
};

export default SideContent;