import Image from 'next/image';
import styles from './index.module.css';

const NoPosts = () => {
  return (
    <div className={styles['empty-profile']}>
      <Image src="/camera.svg" alt="camera" height="50" width="50" />
      <span>No posts yet</span>
    </div>
  );
};

export default NoPosts;
