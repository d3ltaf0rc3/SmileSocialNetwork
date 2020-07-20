import React, {Fragment} from 'react';
import Footer from '../../components/footer';
import CredentialsForm from '../../components/credentials-form';

const RegisterPage = () => {
    return (
        <Fragment>
            <CredentialsForm formType="register"/>
            <Footer />
        </Fragment>
    )
};

export default RegisterPage;