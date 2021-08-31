import styles from './index.module.css';
import Comment from '../../feed-post-card/comment';
import Avatar from '../../user-avatar';

const PostComment = ({ imageUrl, author, comment }) => {
  return (
    <div className={styles.comment}>
      <Avatar size="32" imageUrl={imageUrl} />
      <Comment author={author} comment={comment} />
    </div>
  );
};

export default PostComment;
