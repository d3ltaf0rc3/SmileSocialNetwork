import React, { useState } from 'react';
import styles from './index.module.css';
import arrow from '../../images/next.svg';

const AddComment = (props) => {
    const [comment, setComment] = useState("");

    const addComment = () => {
        if (comment !== "") {
            fetch(`${process.env.API_URL}/api/posts/add-comment/${props.id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    comment
                })
            })
                .then(() => {
                    setComment("");
                    props.setUpdate();
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className={styles["add-comment"]}>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                id={props.id}
                placeholder="Add a comment..."></textarea>
            <img onClick={addComment} src={arrow} alt="arrow" />
        </div>
    )
};

export default AddComment;