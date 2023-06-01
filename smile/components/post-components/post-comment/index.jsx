import Image from 'next/image';
import Comment from '../../feed-post-card/comment';
import styles from './index.module.css';

const PostComment = ({ imageUrl, author, comment }) => {
  return (
    <div className={styles.comment}>
      <Image
        className={styles.avatar}
        src={imageUrl}
        alt="user"
        width="32"
        height="32"
      />
      <Comment author={author} comment={comment} />
    </div>
  );
};

export default PostComment;
