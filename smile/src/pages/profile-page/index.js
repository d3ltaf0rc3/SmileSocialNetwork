import React, { Fragment, useContext } from 'react';
import styles from './index.module.css';
import Head from '../../components/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ProfileHeader from '../../components/profile-components/header';
import PhotosGrid from '../../components/profile-components/photos-grid';
import Private from '../../components/profile-components/private-profile';
import UserContext from '../../contexts/AuthContext';

const ProfilePage = (props) => {
    const context = useContext(UserContext);

    if (context.user === null) {
        return <div>{/* To do spinner*/}</div>
    }

    return (
        <Fragment>
            <Head title={`${context.user.name || context.user.username} (@${context.user.username}) | Smile`} />
            <Header />
            <div className={styles.container}>
                <ProfileHeader />
                {context.user.isPrivate ? <Private /> : <PhotosGrid />}
            </div>
            <Footer />
            {props.children}
        </Fragment>
    )
};

export default ProfilePage;