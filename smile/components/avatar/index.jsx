import Image from 'next/image';
import styles from './index.module.css';

const Avatar = ({ size, src }) => {
  return (
    <div style={{ width: `${size}px`, height: `${size}px` }} className={styles.container}>
      <Image src={src} width={size} height={size} alt="user profile picture" objectFit="cover" quality={100} />
    </div>
  );
};

export default Avatar;
