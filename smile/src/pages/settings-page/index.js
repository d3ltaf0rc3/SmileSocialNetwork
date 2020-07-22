import React, { Fragment, useState } from 'react';
import styles from './index.module.css';
import Head from '../../components/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Avatar from '../../components/user-avatar';
import SettingsForm from '../../components/settings-form';

const SettingsPage = () => {
    const [image, setImage] = useState("");

    const openWidget = () => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: "smile-social-network",
            uploadPreset: "profile_pics"
        }, (error, result) => {
            if (result.event === "success") {
                setImage(result.info.url);
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
                    <div className={styles["user-data"]}>
                        <Avatar imageUrl="https://res.cloudinary.com/smile-social-network/image/upload/v1595427921/27355582_1179049615563903_3557061432587273374_o_drqknp.jpg" size="32" />
                        <span>lmm_47</span>
                    </div>
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