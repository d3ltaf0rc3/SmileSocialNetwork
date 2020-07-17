import React, { Fragment } from 'react';
import Footer from '../footer';
import CredentialsForm from '../credentials-form';

const LoginPage = () => {
    return (
        <Fragment>
            <CredentialsForm formType="login"/>
            <Footer />
        </Fragment>
    );
};

export default LoginPage;