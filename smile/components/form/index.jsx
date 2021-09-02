import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import Logo from '../logo';
import Input from '../input';
import AuthContext from '../../contexts/authContext';
import ErrorBox from '../error';

const Form = () => {
  const context = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState();
  const router = useRouter();

  const changePassword = (e) => {
    e.preventDefault();
    setError('');

    if (password !== rePassword) {
      setError('Both passwords must match!');
    } else if (password.length < 8 || password.length > 18) {
      setError('Password must be between 8 and 18 characters long!');
    } else if (!/^[\w!@#$%&?]+$/.test(password)) {
      setError(
        'Password can only contain english letters, numbers, underscores, !, @, #, $, %, &, ? and *!'
      );
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/api/user/change-password`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          oldPassword,
          password,
          repeatPassword: rePassword,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            context.logOut();
            router.push('/login');
          } else {
            setError(res.data);
          }
        })
        .catch((err) => setError(err.message));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['form-container']}>
        <Logo />
        {error ? <ErrorBox error={error} /> : null}
        <form className={styles.form}>
          <Input
            type="password"
            value={oldPassword}
            placeholder="Old Password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            value={rePassword}
            placeholder="Repeat Password"
            onChange={(e) => setRePassword(e.target.value)}
          />
          <button type="button" onClick={changePassword} className={styles.btn}>
            Change password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;