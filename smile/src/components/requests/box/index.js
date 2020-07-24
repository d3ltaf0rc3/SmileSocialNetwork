import React from 'react';
import styles from './index.module.css';
import Request from '../box-element';

const RequestsBox = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.arrow}></div>
            <div onMouseLeave={props.onMouseLeave} className={styles.box}>
                <Request />
                <Request />
                <Request />
                <Request />
                <Request />
                <Request />
                <Request />
                <Request />
                <Request />
            </div>
        </div>
    )
};

export default RequestsBox;