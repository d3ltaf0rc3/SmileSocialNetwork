import React from 'react';
import styles from './index.module.css';
import GridPhoto from '../grid-photo';

const PhotosGrid = () => {
    return (
        <section className={styles.photos}>
            <GridPhoto />
            <GridPhoto />
            <GridPhoto />
            <GridPhoto />
        </section>
    )
}

export default PhotosGrid;