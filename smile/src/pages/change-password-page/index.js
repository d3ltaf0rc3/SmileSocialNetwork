import React, { Fragment } from 'react';
import Head from '../../components/head';
import Form from './form';
import Footer from '../../components/footer';

const ChangePasswordPage = () => {
    return (
        <Fragment>
            <Head title="Change Password | Smile" />
            <Form />
            <Footer />
        </Fragment>
    )
}

export default ChangePasswordPage;