import { useState, useEffect } from 'react';
import Link from 'next/link';
import Input from '../input';
import Logo from '../logo';
import ErrorComponent from '../error';
import ReCaptcha from '../reCaptcha';
import styles from './index.module.css';

const CredentialsForm = ({ formType, onSubmit, serverError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (username && password && checked) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, password, checked]);

  const submitHandler = (e) => {
    e.preventDefault();
    setError('');

    if (username.length < 2 || username.length > 18) {
      setError('Username must be between 2 and 18 characters long!');
    } else if (!/^[\w.]+$/.test(username)) {
      setError('Username can only contain english letters, numbers, underscores and dots!');
    } else if (password.length < 8 || password.length > 18) {
      setError('Password must be between 8 and 18 characters long!');
    } else if (formType === 'register' && password !== rePassword) {
      setError('Both passwords must match!');
    } else {
      onSubmit(username.trim(), password.trim(), rePassword.trim());
    }
  };

  return (
    <section className={styles.container}>
      <div>
        <div className={styles.formContainer}>
          <div className={styles.logoContainer}>
            <Logo />
          </div>
          {error || serverError ? <ErrorComponent error={error || serverError} /> : null}
          <form className={styles.form} onSubmit={submitHandler}>
            <Input
              name="username"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {formType === 'register' ? (
              <Input
                name="repeatPassword"
                type="password"
                placeholder="Repeat password"
                onChange={(e) => setRePassword(e.target.value)}
              />
            ) : null}
            <ReCaptcha setChecked={setChecked} />
            <button disabled={disabled} type="submit" className={styles.btn}>
              {formType.replace(formType[0], formType[0].toUpperCase())}
            </button>
          </form>
        </div>
        {formType === 'register' ? (
          <div className={styles.signUp}>
            Already have an account?{' '}
            <Link href="/login">
              <a>Login instead</a>
            </Link>
          </div>
        ) : null}
        {formType === 'login' ? (
          <div className={styles.signUp}>
            Don&apos;t have an account?{' '}
            <Link href="/register">
              <a>Sign up</a>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CredentialsForm;
