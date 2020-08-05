import React, { useState, useContext } from 'react';
import styles from './index.module.css';
import Input from '../../input';
import Textarea from "../../textarea";
import PostContext from '../../../contexts/PostContext';

const Edit = () => {
    const context = useContext(PostContext);
    const [location, setLocation] = useState(context.post.location);
    const [description, setDescription] = useState(context.post.description);

    const editPost = (e) => {
        e.preventDefault();

        fetch(`http://localhost:7777/api/posts/edit/${context.post._id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                location,
                description
            })
        })
        .then(() => {
            setLocation("");
            setDescription("");
        })
        .catch(err => console.error(err));
    };

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" type="text"/>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Caption..." />
                <button onClick={editPost} className={styles.btn}>Save changes</button>
            </form>
        </div>
    )
}

export default Edit;