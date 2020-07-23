import React from 'react';
import styles from './index.module.css';
import Avatar from '../../user-avatar';
import Actions from '../../feed-post-card/actions';
import AddComment from '../../feed-post-card/add-comment';
import Likes from '../../feed-post-card/likes';
import Comment from '../../feed-post-card/comment';

const SideContent = () => {
    return (
        <div className={styles.content}>
            <ul className={styles["comment-section"]}>
                <div className={styles.comment}>
                    <Avatar size="32" imageUrl="https://scontent.fpdv1-1.fna.fbcdn.net/v/t31.0-8/28071297_1190906327711565_6994321913720957204_o.jpg?_nc_cat=109&_nc_sid=0debeb&_nc_ohc=1bE1Jv1JChQAX9xgl8D&_nc_ht=scontent.fpdv1-1.fna&oh=ac4f57f5d742ed3b644fed6fc8f11c67&oe=5F3AD470" />
                    <Comment author="marinov_m" comment="asd" />
                </div>
            </ul>
            
            <section className={styles.actions}>
                <Actions imageUrl="1" />
                <Likes />
                <AddComment imageUrl="1" />
            </section>
        </div>
    )
};

export default SideContent;