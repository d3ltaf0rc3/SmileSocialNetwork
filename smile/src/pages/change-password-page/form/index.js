import React, { useState, useContext } from 'react';
import styles from './index.module.css';
import Logo from '../../../components/logo';
import Input from '../../../components/input';
import { withRouter } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import ErrorBox from '../../../components/error';

const Form = (props) => {
    const context = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState();

    const changePassword = (e) => {
        e.preventDefault();
        setError("");

        if (password !== rePassword) {
            setError("Both passwords must match!");
        } else if (password.length < 8 || password.length > 18) {
            setError("Password must be between 8 and 18 characters long!");
        } else if (!/^[\w!@#$%&?]+$/.test(password)) {
            setError("Password can only contain english letters, numbers, underscores, !, @, #, $, %, &, ? and *!");
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/api/user/change-password`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    oldPassword,
                    password,
                    repeatPassword: rePassword
                })
            })
                .then(res => {
                    if (res.ok) {
                        context.logOut();
                        props.history.push("/login");
                    } else {
                        return res.text();
                    }
                })
                .then((err) => {
                    if (err) {
                        setError(err);
                    }
                })
                .catch(err => setError(err));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles["form-container"]}>
                <Logo />
                {error ? <ErrorBox error={error} /> : null}
                <form className={styles.form}>
                    <Input type="password" value={oldPassword} placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} />
                    <Input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <Input type="password" value={rePassword} placeholder="Repeat Password" onChange={(e) => setRePassword(e.target.value)} />
                    <button onClick={changePassword} className={styles.btn}>Change password</button>
                </form>
            </div>
        </div>
    )
};

export default withRouter(Form);