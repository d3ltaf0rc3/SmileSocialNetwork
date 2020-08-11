import React, { useEffect, useState, useContext, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './index.module.css';
import Head from '../../components/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ProfileHeader from '../../components/profile-components/header';
import PhotosGrid from '../../components/profile-components/photos-grid';
import Private from '../../components/profile-components/private-profile';
import ProfileContext from '../../contexts/ProfileContext';
import UserContext from '../../contexts/AuthContext';
import camera from '../../images/camera.svg';
import Spinner from '../../components/loading-spinner';
import getUser from '../../utils/getUser';

const ProfilePage = (props) => {
    const context = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [didUpdate, setUpdate] = useState();

    useEffect(() => {
        getUser(props.history, props.match.params.username, setProfile);
    }, [props.history, props.match.params.username, didUpdate]);

    if (profile === null || context.user === null) {
        return (
            <Fragment>
                <Head title="Smile" />
                <Header />
                <div className={styles.container}>
                    <Spinner />
                </div>
                <Footer />
            </Fragment>
        )
    }

    return (
        <ProfileContext.Provider value={{
            ...profile,
            doesUserFollow: profile.followers.some(user => user.username === context.user.username),
            triggerUpdate: () => setUpdate(!didUpdate)
        }}>
            <Head title={`${profile.name || profile.username} (@${profile.username}) | Smile`} />
            <Header />
            <div className={styles.container}>
                <ProfileHeader />
                {context.user.username === profile.username ||
                    profile.followers.some(user => user.username === context.user.username) ||
                    profile.isPrivate === false ?
                    profile.posts.length === 0 ?
                        <div className={styles["empty-profile"]}>
                            <img src={camera} alt="camera" />
                            <span>No posts yet</span>
                        </div> :
                        <PhotosGrid /> : <Private />}
            </div>
            <Footer />
        </ProfileContext.Provider>
    )
};

export default withRouter(ProfilePage);