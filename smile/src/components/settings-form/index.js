import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import Input from '../input';
import Textarea from '../textarea';

const SettingsForm = () => {
    return (
        <form className={styles.form}>
            <Input placeholder="Username" />
            <Input placeholder="Name" />

            <Textarea placeholder="Bio" />

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