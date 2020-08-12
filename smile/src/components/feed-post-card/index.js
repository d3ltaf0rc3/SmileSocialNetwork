import React from 'react';
import styles from './index.module.css';
import PostHeader from './header';
import CommentSection from './comment-section';
import PostActions from './actions';
import AddComment from '../add-comment';
import Likes from './likes';
import Video from '../video';

const PostCard = (props) => {
    return (
        <div className={styles.card}>
            <PostHeader username={props.username} location={props.location} imageUrl={props.profilePicture} />
            {props.imageUrl.includes("video") ?
                <Video type="feed" videoUrl={props.imageUrl} /> :
                <img className={styles["post-image"]} src={props.imageUrl} alt="post" />}

            <div className={styles["post-info"]}>
                <PostActions setUpdate={props.setUpdate} id={props.id} likes={props.likes} imageUrl={props.imageUrl} />
                <Likes likes={props.likes.length} />
                <CommentSection creator={props.username} description={props.description} comments={props.comments} />
                <AddComment setUpdate={props.setUpdate} id={props.id} imageUrl={props.imageUrl} />
            </div>
        </div>
    )
}

export default PostCard;