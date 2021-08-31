import { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import GridPhoto from '../grid-photo';
import ProfileContext from '../../../contexts/profileContext';
import Spinner from '../../loading/spinner';

const PhotosGrid = () => {
  const profile = useContext(ProfileContext);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/posts/getPosts/${profile._id}`, {
      method: 'get',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.text();
      })
      .then((res) => {
        if (typeof res === 'object') {
          setPosts(res);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  }, [profile]);

  if (!posts) {
    return (
      <section className={styles.photos}>
        <Spinner />
      </section>
    );
  }

  return (
    <section className={styles.photos}>
      {posts.map((photo) => {
        return <GridPhoto key={photo._id} image={photo.imageUrl} id={photo._id} />;
      })}
    </section>
  );
};

export default PhotosGrid;
