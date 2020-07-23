import React from 'react';
import styles from './index.module.css';
import GridPhoto from '../grid-photo';

const PhotosGrid = () => {
    return (
        <section className={styles.photos}>
            {/* Replace with fetched data */}
            <GridPhoto />
            <GridPhoto />
            <GridPhoto />
            <GridPhoto />
            {/* Replace with fetched data */}
        </section>
    )
}

export default PhotosGrid;