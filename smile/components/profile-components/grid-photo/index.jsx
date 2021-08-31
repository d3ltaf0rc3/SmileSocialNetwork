import { useState } from 'react';
import styles from './index.module.css';
import Post from '../../post-components';

const GridPhoto = ({ image, id }) => {
  const [displayPost, setDisplay] = useState(false);

  return (
    <div>
      <button onClick={() => setDisplay(true)} type="button" className={styles.photo}>
        {image.includes('video') ? (
          <video className={styles.content} src={image} alt="grid part" />
        ) : (
          <img className={styles.content} src={image} alt="grid part" />
        )}
      </button>
      {displayPost ? <Post closeImage={() => setDisplay(false)} id={id} /> : null}
    </div>
  );
};

export default GridPhoto;
