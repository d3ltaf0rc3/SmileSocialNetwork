import React, { useContext } from 'react';
import styles from './index.module.css';
import Actions from '../actions';
import AddComment from '../add-comment';
import Likes from '../../feed-post-card/likes';
import PostComment from '../post-comment';
import PostContext from '../../../contexts/PostContext';

const SideContent = (props) => {
    const context = useContext(PostContext);

    if (!context.post) {
        return <div></div>
    }

    return (
        <div className={styles.content}>
            <ul className={styles["comment-section"]}>
                {context.post.description ? <PostComment
                    imageUrl={context.post.postedBy.profilePicture}
                    author={context.post.postedBy.username}
                    comment={context.post.description} /> : null}
                {context.post.comments.map(comment =>
                    <PostComment
                        key={comment._id}
                        imageUrl={comment.postedBy.profilePicture}
                        author={comment.postedBy.username}
                        comment={comment.comment} />)}
            </ul>

            <section className={styles.actions}>
                <Actions imageUrl={context.post.imageUrl} />
                <Likes likes={props.likes} />
                <AddComment imageUrl={context.post.imageUrl} />
            </section>
        </div>
    )
};

export default SideContent;