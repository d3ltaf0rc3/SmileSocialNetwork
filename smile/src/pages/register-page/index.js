import React, { Fragment, useContext, useState } from 'react';
import Footer from '../../components/footer';
import CredentialsForm from '../../components/credentials-form';
import Head from '../../components/head';
import AuthContext from '../../contexts/AuthContext';
import register from '../../utils/auth';

const RegisterPage = () => {
    const context = useContext(AuthContext);
    const [error, setError] = useState();

    const submitHandler = (username, password, rePassword) => {
        register(context, "register", { username, password, repeatPassword: rePassword }, setError);
    };

    return (
        <Fragment>
            <Head title="Register | Smile" />
            <CredentialsForm error={error} onSubmit={submitHandler} formType="register" />
            <Footer />
        </Fragment>
    )
};

export default RegisterPage;