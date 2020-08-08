import React from 'react';
import styles from './index.module.css';

const ErrorComponent = (props) => {
    return (
        <div className={styles.container}>
            <span>{props.error}</span>
        </div>
    )
};

export default ErrorComponent;