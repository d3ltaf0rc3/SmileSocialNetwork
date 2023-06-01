import Image from 'next/image';
import styles from './index.module.css';

const NoPosts = () => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.imageContainer}>
        <Image
          src="/camera.svg"
          alt="camera"
          height="50"
          width="50"
        />
      </div>
      <h6>No posts yet</h6>
    </div>
  );
};

export default NoPosts;
