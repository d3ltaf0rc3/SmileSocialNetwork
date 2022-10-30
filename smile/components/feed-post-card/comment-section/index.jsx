import Comment from '../comment';
import styles from './index.module.css';

const CommentSection = ({ comments, description, creator }) => {
  return (
    <div className={styles.commentsContainer}>
      {description ? <Comment author={creator} comment={description} /> : null}
      {comments.map((comment) => (
        <Comment key={comment._id} author={comment.postedBy.username} comment={comment.comment} />
      ))}
    </div>
  );
};

export default CommentSection;
