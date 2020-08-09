import React, { useState } from 'react';
import styles from './index.module.css';
import Post from '../../post-components';

const GridPhoto = (props) => {
    const [displayPost, setDisplay] = useState(false);

    return (
        <div>
            <div onClick={() => setDisplay(true)} className={styles["photo"]}>
                <img src={props.image} alt="grid part" />
            </div>
            {displayPost ? <Post closeImage={() => setDisplay(false)} id={props.id} /> : null}
        </div>
    )
};

export default GridPhoto;
