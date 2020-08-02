import React, { useState } from 'react';
import styles from './index.module.css';
import PostPage from '../../../pages/post-page';

const GridPhoto = (props) => {
    const [displayPost, setDisplay] = useState(false);

    return (
        <div>
            <div onClick={() => setDisplay(true)} className={styles["photo"]}>
                <img src={props.image} alt="grid part" />
            </div>
            {displayPost ? <PostPage closeImage={() => setDisplay(false)} id={props.id} /> : null}
        </div>
    )
};

export default GridPhoto;
