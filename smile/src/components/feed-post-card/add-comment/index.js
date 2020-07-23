import React from 'react'
import styles from './index.module.css';
import arrow from '../../../images/next.svg';

const AddComment = (props) => {
    return (
        <div className={styles["add-comment"]}>
            <textarea id={props.imageUrl} name="comment" placeholder="Add a comment..."></textarea>
            <img src={arrow} alt="arrow" />
        </div>
    )
};

export default AddComment;