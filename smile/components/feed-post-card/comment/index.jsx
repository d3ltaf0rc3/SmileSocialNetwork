import Link from 'next/link';
import styles from './index.module.css';

const Comment = ({ author, comment }) => {
  return (
    <div className={styles.comment}>
      <Link className={styles.link} href={`/user/${author}`}>
        {author}
      </Link>
      {comment}
    </div>
  );
};

export default Comment;
