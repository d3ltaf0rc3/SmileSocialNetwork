import { Fragment, useContext, useState } from 'react';
import Footer from '../../components/footer';
import CredentialsForm from '../../components/credentials-form';
import Head from "../../components/head";
import AuthContext from '../../contexts/AuthContext';
import login from '../../utils/auth';

const LoginPage = () => {
    const context = useContext(AuthContext);
    const [error, setError] = useState();

    const submitHandler = (username, password) => {
        login(context, "login", { username, password }, setError);
    };

    return (
        <Fragment>
            <Head title="Login | Smile" />
            <CredentialsForm error={error} onSubmit={submitHandler} formType="login" />
            <Footer />
        </Fragment>
    );
};

export default LoginPage;