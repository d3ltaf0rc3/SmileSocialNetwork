import React, {Fragment} from 'react';
import Footer from '../../components/footer';
import CredentialsForm from '../../components/credentials-form';
import Head from '../../components/head';

const RegisterPage = () => {
    return (
        <Fragment>
            <Head title="Register | Smile"/>
            <CredentialsForm formType="register"/>
            <Footer />
        </Fragment>
    )
};

export default RegisterPage;