import React, { useState, useContext } from 'react';
import styles from './index.module.css';
import Logo from '../../../components/logo';
import Input from '../../../components/input';
import { withRouter } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';

const Form = (props) => {
    const context = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    
    const changePassword = (e) => {
        e.preventDefault();
        
        fetch("http://localhost:7777/api/change-password", {
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
        .then(res => res.json())
        .then(() => {
            context.logOut();
            props.history.push("/login");
        })
        .catch(err => console.error(err));
    };

    return (
        <div className={styles.container}>
            <div className={styles["form-container"]}>
                <Logo />
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