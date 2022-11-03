import { useState } from 'react';
import Image from 'next/future/image';
import Post from '../../post-components';
import styles from './index.module.css';

const GridPhoto = ({ resource, resourceType, id, notify }) => {
  const [displayPost, setDisplay] = useState(false);

  return (
    <>
      <button onClick={() => setDisplay(true)} type="button" className={styles.photo}>
        {resourceType === 'video' ? (
          <video className={styles.content} src={resource} alt="grid part" />
        ) : (
          <Image className={styles.content} src={resource} width="293" height="293" alt="grid part" quality={100} />
        )}
      </button>
      {displayPost ? <Post notify={notify} closePost={() => setDisplay(false)} id={id} /> : null}
    </>
  );
};

export default GridPhoto;
