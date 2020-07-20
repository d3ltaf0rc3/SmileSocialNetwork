import React, { Fragment } from 'react';
import Footer from '../../components/footer';
import CredentialsForm from '../../components/credentials-form';

const LoginPage = () => {
    return (
        <Fragment>
            <CredentialsForm formType="login"/>
            <Footer />
        </Fragment>
    );
};

export default LoginPage;