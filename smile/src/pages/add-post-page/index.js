import React, { Fragment, useState } from 'react';
import styles from './index.module.css';
import Head from '../../components/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Input from '../../components/input';
import Textarea from '../../components/textarea';
import { Link } from 'react-router-dom';

const AddPostPage = () => {
    const [image, setImage] = useState("")

    const openWidget = () => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: "smile-social-network",
            uploadPreset: "user_posts"
        }, (error, result) => {
            if (result.event === "success") {
                setImage(result.info.url);
            }
        });

        widget.open();
    };

    const removeImage = () => {
        setImage("");
    }

    return (
        <Fragment>
            <Head title="Post a photo | Smile" />
            <Header />
            <div className={styles.container}>
                {image ? <img src={image} alt="preview" /> : null}
                {image ? <button onClick={removeImage} className={`${styles.btn} ${styles.remove}`}>Remove image</button> : <button className={styles["btn"]} onClick={openWidget}>Upload image</button>}
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <Input type="text" placeholder="Location" />
                    <Textarea placeholder="Write a caption..." />

                    <div className={styles.buttons}>
                        <button className={styles.btn}>Add post</button>
                        <Link to="/"><button className={`${styles.btn} ${styles.remove}`}>Cancel</button></Link>
                    </div>
                </form>
            </div>
        </Fragment>
    )
};

export default AddPostPage;