import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Head from '../../components/head';

const ErrorPage = () => {
    return (
        <Fragment>
            <Head title="Page Not Found | Smile" />
            <Header />
            <div className={styles.container}>
                <h1>Sorry, this page isn't available.</h1>
                <p>The link you followed may be broken, or the page may have been removed. <Link className={styles.link} to="/">Go back to Smile.</Link></p>
            </div>
            <Footer />
        </Fragment>
    )
};

export default ErrorPage;
