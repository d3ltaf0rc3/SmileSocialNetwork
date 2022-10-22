import { useContext, useEffect, useState } from 'react';
import GridPhoto from '../grid-photo';
import ProfilePostLoader from '../../loading/profile-post';
import ProfileContext from '../../../contexts/profileContext';
import styles from './index.module.css';

const PhotosGrid = ({ notify }) => {
  const profile = useContext(ProfileContext);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch(`/api/post/getUserPosts?username=${profile.username}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setPosts(res.data);
        } else {
          notify(res.data, { type: 'failure' });
        }
      })
      .catch(() => {
        notify('Our servers are currently unreachable. Try again later!', { type: 'failure' });
      });
  }, [profile.username]);

  return (
    <section className={styles.photos}>
      {posts ? (
        posts.map((photo) => (
          <GridPhoto
            key={photo._id}
            resource={photo.resource}
            resourceType={photo.resource_type}
            id={photo._id}
          />
        ))
      ) : (
        <>
          <ProfilePostLoader />
          <ProfilePostLoader />
          <ProfilePostLoader />
          <ProfilePostLoader />
          <ProfilePostLoader />
          <ProfilePostLoader />
        </>
      )}
    </section>
  );
};

export default PhotosGrid;
