import { useContext, useState } from 'react';
import styles from './index.module.css';
import Actions from '../actions';
import AddComment from '../../add-comment';
import Likes from '../../feed-post-card/likes';
import PostComment from '../post-comment';
import PostHeader from '../../feed-post-card/header';
import PostContext from '../../../contexts/postContext';

const SideContent = ({ notify }) => {
  const post = useContext(PostContext);
  const [comments, setComments] = useState(post.comments);

  return (
    <aside className={styles.aside}>
      <PostHeader
        imageUrl={post.postedBy.profilePicture}
        location={post.location}
        username={post.postedBy.username}
      />
      <div className={styles.content}>
        <div className={styles.commentSection}>
          {post.description ? (
            <PostComment
              imageUrl={post.postedBy.profilePicture}
              author={post.postedBy.username}
              comment={post.description}
            />
          ) : null}
          {comments.map((comment) => (
            <PostComment
              key={comment._id}
              imageUrl={comment.postedBy.profilePicture}
              author={comment.postedBy.username}
              comment={comment.comment}
            />
          ))}
        </div>
        <Actions focusOnInput={() => {}} notify={notify} />
        <Likes likes={post.likes.length} />
        <AddComment
          updateComments={(comment) => setComments([...comments, comment])}
          postId={post._id}
        />
      </div>
    </aside>
  );
};

export default SideContent;
