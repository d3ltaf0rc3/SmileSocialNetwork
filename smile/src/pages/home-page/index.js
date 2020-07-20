import React, { Fragment } from 'react';
import Header from '../../components/header';
import Head from '../../components/head';
import Post from '../../components/post-card';
import styles from './index.module.css'

const HomePage = () => {
    return (
        <Fragment>
            <Head title="Feed | Smile" />
            <Header />
            <div className={styles.feed}>
                <Post />
                <Post />
            </div>
        </Fragment>
    )
};

export default HomePage;