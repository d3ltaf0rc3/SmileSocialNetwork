import React, { Fragment } from 'react';
import Footer from '../../components/footer';
import CredentialsForm from '../../components/credentials-form';
import Head from "../../components/head";

const LoginPage = () => {
    return (
        <Fragment>
            <Head title="Login | Smile" />
            <CredentialsForm formType="login" />
            <Footer />
        </Fragment>
    );
};

export default LoginPage;