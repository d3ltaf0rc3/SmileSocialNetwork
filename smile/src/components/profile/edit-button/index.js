import React from 'react';
import styles from './index.module.css';
import {Link} from 'react-router-dom';

const EditButton = () => {
    return (
        <Link className={styles["edit-button"]} to="/settings">Edit profile</Link>
    )
}

export default EditButton;