import React, { Fragment, useContext } from 'react';
import Footer from '../../components/footer';
import CredentialsForm from '../../components/credentials-form';
import Head from '../../components/head';
import AuthContext from '../../Context';

const RegisterPage = (props) => {
    const context = useContext(AuthContext);

    const submitHandler = (username, password, rePassword) => {
        fetch("http://localhost:7777/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username,
                password,
                repeatPassword: rePassword
            })
        })
            .then(res => res.json())
            .then(user => {
                context.logIn(user);
            })
            .catch(err => console.log(err));
    };

    return (
        <Fragment>
            <Head title="Register | Smile" />
            <CredentialsForm onSubmit={submitHandler} formType="register" />
            <Footer />
        </Fragment>
    )
};

export default RegisterPage;