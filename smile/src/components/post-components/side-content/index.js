import React from 'react';
import styles from './index.module.css';
import Actions from '../../feed-post-card/actions';
import AddComment from '../../feed-post-card/add-comment';
import Likes from '../../feed-post-card/likes';
import PostComment from '../post-comment';


const SideContent = (props) => {
    return (
        <div className={styles.content}>
            <ul className={styles["comment-section"]}>
                <PostComment author="marinov_m" comment="<3" />
            </ul>

            <section className={styles.actions}>
                <Actions imageUrl="1" />
                <Likes likes={props.likes} />
                <AddComment imageUrl="1" />
            </section>
        </div>
    )
};

export default SideContent;