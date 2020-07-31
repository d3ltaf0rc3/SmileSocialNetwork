import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const GridPhoto = (props) => {
    return (
        <div className={styles["photo"]}>
            <Link to={`/post/${props.id}`}><img src={props.image} alt="grid part" /></Link>
        </div>
    )
};

export default GridPhoto;
