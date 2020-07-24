import React, { Fragment, useState } from 'react';
import styles from './index.module.css';
import Head from '../../components/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ProfileHeader from '../../components/profile-components/header';
import PhotosGrid from '../../components/profile-components/photos-grid';
import Private from '../../components/profile-components/private-profile';

const ProfilePage = (props) => {
    const [isPrivate, setPrivate] = useState(true);

    return (
        <Fragment>
            <Head title="Lora Marinova (@lmm_47) | Smile" />
            <Header />
            <div className={styles.container}>
                <ProfileHeader />
                {isPrivate ? <Private /> : <PhotosGrid />}
            </div>
            <Footer />
            {props.children}
        </Fragment>
    )
};

export default ProfilePage;