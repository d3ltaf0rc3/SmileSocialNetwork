import React, { Fragment, useContext } from 'react';
import styles from './index.module.css';
import Head from '../../components/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SettingsForm from '../../components/settings-form';
import UserData from '../../components/user-data';
import UserContext from '../../contexts/AuthContext';
import { withRouter } from 'react-router-dom';
import editUser from '../../utils/editUser';

const SettingsPage = (props) => {
    const context = useContext(UserContext);
    const defaultUrl = "https://res.cloudinary.com/smile-social-network/image/upload/v1600976280/download_udtdbe.png";

    const openWidget = () => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: "smile-social-network",
            uploadPreset: "profile_pics"
        }, (error, result) => {
            if (result.event === "success") {
                if (context.user.profilePicture !== defaultUrl) {
                    fetch(`${process.env.REACT_APP_API_URL}/api/posts/delete/cloudinary/${context.user.public_id}`, {
                        method: "delete",
                        credentials: "include"
                    });
                }
                editUser({ profilePicture: result.info.secure_url, public_id: result.info.public_id }, context, props.history);
            } else if (error) {
                console.error(error);
            }
        });
        widget.open();
    };

    const removeProfilePic = () => {
        if (context.user.profilePicture !== defaultUrl) {
            fetch(`${process.env.REACT_APP_API_URL}/api/posts/delete/cloudinary/${context.user.public_id}`, {
                method: "delete",
                credentials: "include"
            });
            editUser({ profilePicture: defaultUrl, public_id: null }, context, props.history);
        }
    };

    return (
        <Fragment>
            <Head title="Settings | Smile" />
            <Header />
            {!context.user ? null :
                <div className={styles["form-container"]}>
                    <div className={styles["avatar-actions"]}>
                        <UserData imageUrl={context.user.profilePicture} username={context.user.username} />
                        <div className={styles.buttons}>
                            <button className={styles.btn} onClick={openWidget}>Change photo</button>
                            {context.user.profilePicture !== defaultUrl ? <button className={styles.btn} onClick={removeProfilePic}>Remove photo</button> : null}
                        </div>
                    </div>
                    <SettingsForm
                        username={context.user.username}
                        name={context.user.name}
                        bio={context.user.description}
                        isPrivate={context.user.isPrivate} />
                </div>}
            <Footer />
        </Fragment>
    )
};

export default withRouter(SettingsPage);