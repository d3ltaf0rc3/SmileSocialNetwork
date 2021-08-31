import Image from 'next/image';
import styles from './index.module.css';

const Avatar = ({ imageUrl, size }) => {
  return (
    <Image
      src={imageUrl}
      className={size === '32' ? styles.smallImage : styles.bigImage}
      alt="user"
    />
  );
};

export default Avatar;
