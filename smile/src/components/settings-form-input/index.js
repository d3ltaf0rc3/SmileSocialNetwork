import React from 'react';
import styles from './index.module.css';

const SettingsFormInput = (props) => {
    return (
        <div className={styles["form-input-container"]}>
            <label className={styles.label} htmlFor={props.id}>{props.label}</label>
            <input className={styles.input} id={props.id} type={props.type} />
        </div>
    )
};

export default SettingsFormInput;