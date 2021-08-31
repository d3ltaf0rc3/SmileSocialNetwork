import Link from 'next/link';
import styles from './index.module.css';

const Comment = ({ author, comment }) => {
  return (
    <li className={styles['post-comment']}>
      <span className={styles['comment-author']}>
        <Link href={`/user/${author}`}>
          <a className={styles.link}>{author}</a>
        </Link>
      </span>{' '}
      {comment}
    </li>
  );
};

export default Comment;
