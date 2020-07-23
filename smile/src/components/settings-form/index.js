import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import Input from '../input';

const SettingsForm = () => {
    return (
        <form className={styles.form}>
            <Input placeholder="Username" />
            <Input placeholder="Name" />

            <div className={styles.container}>
                <textarea placeholder="Bio"></textarea>
            </div>

            <div className={styles["checkbox-container"]}>
                <label htmlFor="private-profile-checkbox">Private profile</label>
                <input id="private-profile-checkbox" type="checkbox"></input>
            </div>

            <div className={styles.actions}>
                <button>Save changes</button>
                <Link to="/user/lmm_47">Cancel</Link>
                <Link to="/change-password">Change password</Link>
            </div>
        </form>
    )
};

export default SettingsForm;