import Link from 'next/link';
import styles from './index.module.css';

const Comment = ({ author, comment }) => {
  return (
    <div className={styles.comment}>
      <Link href={`/user/${author}`}>
        <a className={styles.link}>{author}</a>
      </Link>
      {comment}
    </div>
  );
};

export default Comment;
