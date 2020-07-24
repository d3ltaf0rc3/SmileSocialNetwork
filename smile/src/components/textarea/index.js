import React from 'react';
import styles from './index.module.css';

const Textarea = (props) => {
    return (
        <div className={styles.container}>
            <textarea placeholder={props.placeholder}></textarea>
        </div>
    )
}

export default Textarea;