import React, {Fragment} from 'react';
import Footer from '../footer';
import CredentialsForm from '../credentials-form';

const RegisterPage = () => {
    return (
        <Fragment>
            <CredentialsForm formType="register"/>
            <Footer />
        </Fragment>
    )
};

export default RegisterPage;