import React, { useContext } from 'react';
import styles from './index.module.css';
import GridPhoto from '../grid-photo';
import ProfileContext from '../../../contexts/ProfileContext';

const PhotosGrid = () => {
    const profileContext = useContext(ProfileContext);

    return (
        <section className={styles.photos}>
            {profileContext.posts.map(photo => {
                return <GridPhoto key={photo._id} image={photo.imageUrl} id={photo._id} />
            })}
        </section>
    )
}

export default PhotosGrid;