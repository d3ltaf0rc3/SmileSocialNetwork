import styles from './index.module.css';
import PostHeader from './header';
import CommentSection from './comment-section';
import PostActions from './actions';
import AddComment from '../add-comment';
import Likes from './likes';
import Video from '../video';

const PostCard = ({
  username,
  location,
  profilePicture,
  imageUrl,
  setUpdate,
  likes,
  description,
  id,
  comments,
}) => {
  return (
    <div className={styles.card}>
      <PostHeader username={username} location={location} imageUrl={profilePicture} />
      {imageUrl.includes('video') ? (
        <Video type="feed" videoUrl={imageUrl} />
      ) : (
        <img className={styles['post-image']} src={imageUrl} alt="post" />
      )}

      <div className={styles['post-info']}>
        <PostActions setUpdate={setUpdate} id={id} likes={likes} />
        <Likes likes={likes.length} />
        <CommentSection creator={username} description={description} comments={comments} />
        <AddComment setUpdate={setUpdate} id={id} />
      </div>
    </div>
  );
};

export default PostCard;
