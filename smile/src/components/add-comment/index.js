import React, { useState } from 'react';
import styles from './index.module.css';
import arrow from '../../images/next.svg';

const AddComment = (props) => {
    const [comment, setComment] = useState("");

    const addComment = () => {
        if (comment !== "") {
            fetch(`http://localhost:7777/api/posts/add-comment/${props.id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    comment
                })
            })
            .then((res) => {
                setComment("");
                return res.json();
            })
            .then(comment => props.setUpdate(comment._id))
                .catch(err => console.log(err));
        }
    };

    return (
        <div className={styles["add-comment"]}>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} id={props.imageUrl} placeholder="Add a comment..."></textarea>
            <img onClick={addComment} src={arrow} alt="arrow" />
        </div>
    )
};

export default AddComment;