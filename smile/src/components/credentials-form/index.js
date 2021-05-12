import { useState, useEffect } from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import Input from '../input';
import Logo from '../logo';
import ErrorComponent from '../error';
import ReCaptcha from '../reCaptcha';

const CredentialsForm = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (checked) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [checked]);

    const submitHandler = (e) => {
        e.preventDefault();
        setError("");

        if (username.length < 2 || username.length > 18) {
            setError("Username must be between 2 and 18 characters long!");
        } else if (!/^[\w.]+$/.test(username)) {
            setError("Username can only contain english letters, numbers, underscores and dots!");
        } else if (password.length < 8 || password.length > 18) {
            setError("Password must be between 8 and 18 characters long!");
        } else if (!/^[\w!@#$%&?]+$/.test(password)) {
            setError("Password can only contain english letters, numbers, underscores, !, @, #, $, %, &, ? and *!");
        } else if (props.formType === "register" && password !== rePassword) {
            setError("Both passwords must match!");
        } else {
            props.onSubmit(username, password, rePassword);
        }
    };

    return (
        <div className={styles.center}>
            <div className={styles.container}>
                <div className={styles["form-container"]}>
                    <div className={styles["logo-container"]}>
                        <Logo />
                    </div>
                    {error || props.error ? <ErrorComponent error={error || props.error} /> : null}
                    <form className={styles.form} onSubmit={submitHandler}>
                        <Input name="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <Input name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        {props.formType === "register" ? (
                            <Input name="repeatPassword" type="password" placeholder="Repeat password" onChange={(e) => setRePassword(e.target.value)} />
                        ) : null}
                        <ReCaptcha setChecked={setChecked} />
                        <button disabled={disabled} className={styles.btn}>
                            {props.formType.replace(props.formType[0], props.formType[0].toUpperCase())}
                        </button>
                    </form>
                </div>
                <div className={styles.signup}>
                    {props.formType === "register" ? <p>Already have an account? <Link to="/login">Login instead</Link></p> : null}
                    {props.formType === "login" ? <p>Don't have an account? <Link to="/register">Sign up</Link></p> : null}
                </div>
            </div>
        </div>
    )
};

export default CredentialsForm;