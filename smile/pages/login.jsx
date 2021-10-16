import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Footer from '../components/footer';
import CredentialsForm from '../components/credentials-form';

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState();

  const submitHandler = (username, password) => {
    fetch(`${window.location.origin}/api/auth/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
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
        <title>Login | Smile</title>
      </Head>
      <CredentialsForm serverError={error} onSubmit={submitHandler} formType="login" />
      <Footer />
    </>
  );
};

export default LoginPage;
