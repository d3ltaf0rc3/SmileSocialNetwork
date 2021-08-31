import styles from './index.module.css';

const Likes = ({ likes }) => {
  return (
    <span className={styles['post-likes']}>
      {likes} {likes === 1 ? 'like' : 'likes'}
    </span>
  );
};

export default Likes;
