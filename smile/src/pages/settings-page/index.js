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

    const openWidget = () => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: "smile-social-network",
            uploadPreset: "profile_pics"
        }, (error, result) => {
            if (result.event === "success") {
                const user = context.user;
                user.profilePicture = result.info.url;

                editUser(user, context, props.history);
            }
        });
        widget.open();
    };

    const removeProfilePic = () => {
        const user = context.user;
        user.profilePicture = "https://res.cloudinary.com/smile-social-network/image/upload/v1600976280/download_udtdbe.png";

        editUser(user, context, props.history);
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
                            <button className={styles.btn} onClick={removeProfilePic}>Remove photo</button>
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