import React, { Fragment, useState } from 'react';
import styles from './index.module.css';
import Head from '../../components/head';
import Header from '../../components/header';
import Input from '../../components/input';
import Textarea from '../../components/textarea';
import { Link, withRouter } from 'react-router-dom';

const AddPostPage = (props) => {
    const [post, setPost] = useState(null);
    const [location, setLocation] = useState("");
    const [caption, setCaption] = useState("");

    const openWidget = () => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: "smile-social-network",
            uploadPreset: "user_posts"
        }, (error, result) => {
            if (result.event === "success") {
                setPost({ url: result.info.secure_url, public_id: result.info.public_id });
            } else if (error) {
                console.error(error);
            }
        });

        widget.open();
    };

    const addPost = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/api/posts/add-post`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                imageUrl: post.url,
                location,
                description: caption,
                public_id: post.public_id
            })
        })
            .then(() => props.history.push("/"))
            .catch(err => console.error(err));
    };

    const removeImage = () => {
        setPost(null);
    };

    return (
        <Fragment>
            <Head title="Add a post | Smile" />
            <Header />

            <div className={styles.container}>
                <header className={styles.heading}>
                    <h1><i className={`${styles.icon} fas fa-plus`}></i>Add a post</h1>
                </header>
                <div className={styles["inner-container"]}>
                    <div className={styles["image-container"]}>
                        {post ? post.url.includes("video") ?
                            <video className={styles.preview} src={post.url} alt="preview" autoPlay loop /> :
                            <img className={styles.preview} src={post.url} alt="preview" /> : null}
                        {!post ? <img className={styles.preview} src="https://res.cloudinary.com/smile-social-network/image/upload/v1608133374/no-product-image_cb5nci.png" alt="preview" /> : null}
                        {post ?
                            <button onClick={removeImage} className={`${styles.btn} ${styles.remove}`}><i className={`${styles.icon} fas fa-times`}></i>Remove image/video</button> :
                            <button onClick={openWidget} className={styles.btn}><i className={`${styles.icon} fas fa-cloud-upload-alt`}></i>Upload image/video</button>}
                    </div>
                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <Input onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Location" />
                            <Textarea onChange={(e) => setCaption(e.target.value)} placeholder="Write a caption..." />
                        </div>

                        <div className={styles.buttons}>
                            <button onClick={addPost} disabled={!post} className={styles.btn}><i className={`${styles.icon} fas fa-plus`}></i>Add post</button>
                            <Link to="/"><button className={`${styles.btn} ${styles.remove}`}><i className={`${styles.icon} fas fa-times`}></i>Cancel</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
};

export default withRouter(AddPostPage);