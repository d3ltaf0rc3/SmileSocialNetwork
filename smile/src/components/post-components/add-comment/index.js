import React, { useState, useContext } from 'react';
import styles from './index.module.css';
import arrow from '../../../images/next.svg';
import PostContext from '../../../contexts/PostContext';

const AddComment = (props) => {
    const context = useContext(PostContext);
    const [comment, setComment] = useState("");

    const addComment = () => {
        if (comment !== "") {
            fetch(`http://localhost:7777/api/posts/add-comment/${context.post._id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    comment
                })
            })
            .then(() => setComment(""))
                .catch(err => console.log(err));
        }
    };

    return (
        <div className={styles["add-comment"]}>
            <textarea onChange={(e) => setComment(e.target.value)} value={comment} id={props.imageUrl} name="comment" placeholder="Add a comment..."></textarea>
            <img onClick={addComment} src={arrow} alt="arrow" />
        </div>
    )
};

export default AddComment;