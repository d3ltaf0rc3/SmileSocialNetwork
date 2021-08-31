import Comment from '../comment';

const CommentSection = ({ comments, description, creator }) => {
  if (!comments) {
    return <div />;
  }

  return (
    <ul>
      {description ? <Comment key="description" author={creator} comment={description} /> : null}
      {comments.map((comment) => (
        <Comment key={comment._id} author={comment.postedBy.username} comment={comment.comment} />
      ))}
    </ul>
  );
};

export default CommentSection;
