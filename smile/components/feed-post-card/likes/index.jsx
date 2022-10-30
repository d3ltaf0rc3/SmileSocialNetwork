import styles from './index.module.css';

const Likes = ({ likes }) => {
  return (
    <div className={styles.likesCount}>
      {likes} {likes === 1 ? 'like' : 'likes'}
    </div>
  );
};

export default Likes;
