import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import GridPhoto from '../grid-photo';
import { withRouter } from 'react-router-dom';

const PhotosGrid = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (props.match.url.includes("/user/")) {
            fetch(`http://localhost:7777/api/posts/get/${props.match.params.username}`)
                .then(res => res.json())
                .then(data => setPosts(data))
                .catch(err => console.error(err));
        }
    }, [props.match.params.username, props.match.url]);

    return (
        <section className={styles.photos}>
            {posts.map(photo => {
                return <GridPhoto key={photo._id} image={photo.imageUrl} id={photo._id} />
            })}
        </section>
    )
}

export default withRouter(PhotosGrid);