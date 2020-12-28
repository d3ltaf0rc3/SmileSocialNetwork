import React, { useState } from 'react';
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
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState("");

    const submitHandler = async (e) => {
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
            await props.onSubmit(username, password, rePassword);
        }
    };

    return (
        <div className={styles.center}>
            <div className={styles.container}>
                <div className={styles["form-container"]}>
                    <div className={styles["logo-container"]}>
                        <Logo />
                    </div>

                    {error || props.error? <ErrorComponent error={error || props.error} /> : null}

                    <form className={styles.form} onSubmit={submitHandler}>
                        <Input name="username" type="text" value={username} placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
                        <Input name="password" type="password" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                        {props.formType === "register" ?
                            <Input name="repeatPassword" type="password" value={rePassword} placeholder="Repeat password" onChange={(event) => setRePassword(event.target.value)} /> : null}
                        <ReCaptcha setDisabled={() => setDisabled(false)} />
                        <button disabled={disabled} className={styles.btn}>{props.formType === "register" ?
                            "Register" : "Login"}</button>
                    </form>
                </div>

                <div className={styles.signup}>
                    {props.formType === "register" ?
                        <p>Already have an account? <Link to="/login">Login instead</Link></p> :
                        <p>Don't have an account? <Link to="/register">Sign up</Link></p>}
                </div>
            </div>
        </div>
    )
};

export default CredentialsForm;