import React, { Fragment } from 'react';
import styles from './index.module.css';
import Head from '../../components/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ProfileHeader from '../../components/profile/header';
import PhotosGrid from '../../components/profile/photos-grid';

const ProfilePage = () => {
    return (
        <Fragment>
            <Head title="Lora Marinova (@lmm_47) | Smile"/>
            <Header />
            <div className={styles.container}>
                <ProfileHeader />
                <PhotosGrid />
            </div>
            <Footer />
        </Fragment>
    )
};

export default ProfilePage;