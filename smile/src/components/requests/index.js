import React, { useState } from 'react';
import styles from './index.module.css';
import heartIcon from '../../images/heart.svg';
import Box from './box';

const Requests = () => {
    const [displayBox, setDisplay] = useState(false);

    const handleClick = () => {
        setDisplay(!displayBox);
    }

    const hideBox = () => {
        setDisplay(false);
    }

    return (
        <div className={styles.container}>
            <img className={styles.icon} src={heartIcon} onClick={handleClick} alt="heart" />
            {displayBox ? <Box onMouseLeave={hideBox} /> : null}
        </div>
    )
}

export default Requests;