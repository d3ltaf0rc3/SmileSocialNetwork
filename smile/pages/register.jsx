import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Head from 'next/head';
import Footer from '../components/footer';
import CredentialsForm from '../components/credentials-form';
import AuthContext from '../contexts/authContext';

const RegisterPage = () => {
  const router = useRouter();
  const { logIn } = useContext(AuthContext);
  const [error, setError] = useState();

  const submitHandler = (username, password, repeatPassword) => {
    fetch(`${window.location.origin}/api/auth/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        repeatPassword,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          logIn(res.data);
          router.push('/');
        } else {
          setError(res.data);
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <>
      <Head>
        <title>Register | Smile</title>
      </Head>
      <CredentialsForm serverError={error} onSubmit={submitHandler} formType="register" />
      <Footer />
    </>
  );
};

export default RegisterPage;
