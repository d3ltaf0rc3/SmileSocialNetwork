import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Logo from '../components/logo';
import Input from '../components/input';
import ErrorBox from '../components/error';
import Footer from '../components/footer';
import requirePageAuth from '../utils/requirePageAuth';
import AuthContext from '../contexts/authContext';
import styles from '../styles/change-password.module.css';

const ChangePasswordPage = ({ user }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState();
  const router = useRouter();

  const changePassword = () => {
    setError('');

    if (password !== repeatPassword) {
      setError('Both passwords must match!');
    } else if (password.length < 8 || password.length > 18) {
      setError('Password must be between 8 and 18 characters long!');
    } else if (oldPassword === password) {
      setError('Your new password cannot be the same as your old password!');
    } else {
      fetch(`${window.location.origin}/api/user/changePassword`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword,
          password,
          repeatPassword,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            router.push('/login');
          } else {
            setError(res.data);
          }
        })
        .catch(() => setError('Our servers are currently unavailable. Try again later!'));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...user,
      }}
    >
      <Head>
        <title>Change password | Smile</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <Logo />
          {error ? <ErrorBox error={error} /> : null}
          <form className={styles.form}>
            <Input
              type="password"
              value={oldPassword}
              placeholder="Old Password"
              onChange={(e) => setOldPassword(e.target.value.trim())}
            />
            <Input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value.trim())}
            />
            <Input
              type="password"
              value={repeatPassword}
              placeholder="Repeat Password"
              onChange={(e) => setRepeatPassword(e.target.value.trim())}
            />
            <button type="button" onClick={changePassword} className={styles.btn}>
              Change password
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </AuthContext.Provider>
  );
};

export default ChangePasswordPage;

export const getServerSideProps = requirePageAuth;
