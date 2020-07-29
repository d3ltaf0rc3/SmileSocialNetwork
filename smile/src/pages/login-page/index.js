import React, { Fragment, useContext } from 'react';
import Footer from '../../components/footer';
import CredentialsForm from '../../components/credentials-form';
import Head from "../../components/head";
import AuthContext from '../../Context';

const LoginPage = (props) => {
    const context = useContext(AuthContext);
    
    const submitHandler = (username, password) => {
        fetch("http://localhost:7777/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            if (res.status === 200) {
                props.history.push("/");
                return res.json();
            }
        }).then(user => {
            context.logIn(user);
        })
            .catch(err => console.log(err));
    };

    return (
        <Fragment>
            <Head title="Login | Smile" />
            <CredentialsForm onSubmit={submitHandler} formType="login" />
            <Footer />
        </Fragment>
    );
};

export default LoginPage;