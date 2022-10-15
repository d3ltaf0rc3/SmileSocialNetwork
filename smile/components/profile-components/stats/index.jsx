import styles from './index.module.css';

const Stats = ({ posts, followers, following }) => {
  return (
    <div className={styles.statContainer}>
      <div className={styles.stat}>
        <span className={styles.statNumber}>{posts}</span> posts
      </div>
      <div className={styles.stat}>
        <span className={styles.statNumber}>{followers}</span> followers
      </div>
      <div className={styles.stat}>
        <span className={styles.statNumber}>{following}</span> following
      </div>
    </div>
  );
};

export default Stats;
