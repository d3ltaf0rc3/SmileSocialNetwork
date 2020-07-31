import React from 'react';
import styles from './index.module.css';

const Input = (props) => {
    return (
        <div className={styles["input-container"]}>
            <input className={styles["custom-input"]} autoComplete="off" value={props.value} onChange={props.onChange} type={props.type} placeholder={props.placeholder} />
        </div>
    );
};

export default Input;