import Link from 'next/link';
import styles from './index.module.css';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <a>Smile</a>
      </Link>
    </div>
  );
};

export default Logo;
