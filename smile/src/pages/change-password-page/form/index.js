import React, { useState } from 'react';
import styles from './index.module.css';
import Logo from '../../../components/logo';
import Input from '../../../components/input';

const Form = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    
    const submitHandler = () => {
        
    }

    return (
        <div className={styles.container}>
            <div className={styles["form-container"]}>
                <Logo />
                <form className={styles.form} onSubmit={submitHandler}>
                    <Input type="password" value={oldPassword} placeholder="Old Password" onChange={(event) => setOldPassword(event.target.value)} />
                    <Input type="password" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                    <Input type="password" value={rePassword} placeholder="Repeat Password" onChange={(event) => setRePassword(event.target.value)} />
                    <button className={styles.btn}>Change password</button>
                </form>
            </div>
        </div>
    )
};

export default Form;