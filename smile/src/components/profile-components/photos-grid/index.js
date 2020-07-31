import React, { useEffect, useState, useContext } from 'react';
import styles from './index.module.css';
import GridPhoto from '../grid-photo';
import { withRouter } from 'react-router-dom';
import PostContext from '../../../contexts/PostContext';
import greySquare from '../../../images/greySquare.jpg'

const PhotosGrid = (props) => {
    const [posts, setPosts] = useState();
    const postContext = useContext(PostContext);

    useEffect(() => {
        if (props.match.url.includes("/user/")) {
            fetch(`http://localhost:7777/api/posts/get/${props.match.params.username}`)
                .then(res => res.json())
                .then(data => setPosts(data))
                .catch(err => console.error(err));
        } else if (props.match.url.includes("/post/")) {
            if (postContext.post !== null) {
                fetch(`http://localhost:7777/api/posts/get/${postContext.post.postedBy.username}`)
                    .then(res => res.json())
                    .then(data => setPosts(data))
                    .catch(err => console.error(err));
            }
        }
    }, [props.match.params.username, props.match.url, postContext.post]);

    if (!posts) {
        return <div></div>
    }

    return (
        <section className={styles.photos}>
            {posts.map(photo => {
                return <GridPhoto key={photo._id} image={photo.imageUrl || greySquare} id={photo._id} />
            })}
        </section>
    )
}

export default withRouter(PhotosGrid);