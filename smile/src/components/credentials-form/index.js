import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import Input from '../input';
import Logo from '../logo';

const CredentialsForm = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles["form-container"]}>
                <Logo />
                <form className={styles.form}>
                    <Input type="text" placeholder="Username" name="username" />
                    <Input type="password" placeholder="Password" name="password" />
                    {props.formType === "register" ? 
                    <Input type="password" placeholder="Repeat password" name="repeatPassword" /> : null}
                    <button className={styles.btn}><Link to="/login">{props.formType === "register" ? 
                    "Register" : "Login"}</Link></button>
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