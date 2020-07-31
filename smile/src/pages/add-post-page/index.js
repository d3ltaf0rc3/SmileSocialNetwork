import React, { Fragment, useState } from 'react';
import styles from './index.module.css';
import Head from '../../components/head';
import Header from '../../components/header';
import Input from '../../components/input';
import Textarea from '../../components/textarea';
import { Link, withRouter } from 'react-router-dom';

const AddPostPage = (props) => {
    const [image, setImage] = useState("");
    const [location, setLocation] = useState("");
    const [caption, setCaption] = useState("");

    const openWidget = () => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: "smile-social-network",
            uploadPreset: "user_posts"
        }, (error, result) => {
            if (result.event === "success") {
                setImage(result.info.url);
            } else if (error) {
                console.error(error);
            }
        });

        widget.open();
    };

    const removeImage = () => {
        setImage("");
    };

    const addPost = (e) => {
        e.preventDefault();

        fetch("http://localhost:7777/api/posts/add-post", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                imageUrl: image,
                location,
                description: caption
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            props.history.push("/");
        })
        .catch(err => console.error(err));
    };

    return (
        <Fragment>
            <Head title="Post a photo | Smile" />
            <Header />

            <div className={styles.container}>
                {image ? <img src={image} alt="preview" /> : null}
                {image ? <button onClick={removeImage} className={`${styles.btn} ${styles.remove}`}>Remove image</button> : <button className={styles["btn"]} onClick={openWidget}>Upload image</button>}
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <Input onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Location" />
                    <Textarea onChange={(e) => setCaption(e.target.value)} placeholder="Write a caption..." />

                    <div className={styles.buttons}>
                        <button onClick={addPost} className={styles.btn}>Add post</button>
                        <Link to="/"><button className={`${styles.btn} ${styles.remove}`}>Cancel</button></Link>
                    </div>
                </form>
            </div>
        </Fragment>
    )
};

export default withRouter(AddPostPage);