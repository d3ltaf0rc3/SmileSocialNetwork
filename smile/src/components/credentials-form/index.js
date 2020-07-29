import React, { useState } from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import Input from '../input';
import Logo from '../logo';

const CredentialsForm = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        await props.onSubmit(username, password, rePassword);
    };

    return (
        <div className={styles.container}>
            <div className={styles["form-container"]}>
                <Logo />
                <form className={styles.form} onSubmit={submitHandler}>
                    <Input type="text" value={username} placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
                    <Input type="password" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                    {props.formType === "register" ?
                        <Input type="password" value={rePassword} placeholder="Repeat password" onChange={(event) => setRePassword(event.target.value)} /> : null}
                    <button className={styles.btn}>{props.formType === "register" ?
                        "Register" : "Login"}</button>
                </form>
            </div>

            <div className={styles.signup}>
                {props.formType === "register" ?
                    <p>Already have an account? <Link to="/login">Login instead</Link></p> :
                    <p>Don't have an account? <Link to="/register">Sign up</Link></p>}
            </div>
        </div>
    )
};

export default CredentialsForm;