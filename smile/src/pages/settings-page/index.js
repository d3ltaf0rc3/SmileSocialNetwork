import React, { Fragment } from 'react';
import styles from './index.module.css';
import Head from '../../components/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SettingsForm from '../../components/settings-form';
import UserData from '../../components/user-data';

const SettingsPage = () => {
    const openWidget = () => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: "smile-social-network",
            uploadPreset: "profile_pics"
        }, (error, result) => {
            if (result.event === "success") {
                //result.info.url;
            }
        });

        widget.open();
    };

    const removeProfilePic = () => {
        //fetch.then
    }

    return (
        <Fragment>
            <Head title="Settings | Smile" />
            <Header />
            <div className={styles["form-container"]}>
                <div className={styles["avatar-actions"]}>
                    <UserData />
                    <div className={styles.buttons}>
                        <button className={styles.btn} onClick={openWidget}>Change photo</button>
                        <button className={styles.btn} onClick={removeProfilePic}>Remove photo</button>
                    </div>
                </div>
                <SettingsForm />
            </div>
            <Footer />
        </Fragment>
    )
};

export default SettingsPage;