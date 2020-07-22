import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import SettingsFormInput from '../../components/settings-form-input';

const SettingsForm = () => {
    return (
        <form>
            <SettingsFormInput id="name" type="text" label="Name" />
            <SettingsFormInput id="username" type="text" label="Username" />
            <div className={styles.container}>
                <label htmlFor="bio-textarea">Bio</label>
                <textarea id="bio-textarea"></textarea>
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