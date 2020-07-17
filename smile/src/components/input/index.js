import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import arrow from '../../images/next.svg';

const Input = (props) => {
    const history = useHistory();

    const routeChange = () => {
        history.push("/search");
    };

    return (
        <div className={styles["input-container"]}>
            <input className={styles["custom-input"]} type={props.type} placeholder={props.placeholder} />
            {props.button ?
                (<button onClick={routeChange} className={styles["custom-input-button"]}>
                    <img src={arrow} alt="arrow" />
                </button>) : null}
        </div>
    );
};

export default Input;