import { useContext, useState } from 'react';
import Image from 'next/future/image';
import PostHeader from './header';
import CommentSection from './comment-section';
import PostActions from './actions';
import AddComment from '../add-comment';
import Likes from './likes';
import Video from '../video';
import UserContext from '../../contexts/authContext';
import styles from './index.module.css';

const PostCard = ({
  username,
  location,
  profilePicture,
  resource,
  likes,
  description,
  id,
  comments,
  notify,
}) => {
  const user = useContext(UserContext);
  const [postComments, setComments] = useState(comments);
  const [postLikes, setLikes] = useState(likes);

  const updateLikeCount = (action) => {
    if (action === 'like') {
      setLikes([...postLikes, user._id]);
    } else {
      setLikes(postLikes.filter((userId) => userId !== user._id));
    }
  };

  return (
    <div className={styles.card}>
      <PostHeader username={username} location={location} imageUrl={profilePicture} />
      {resource.includes('video') ? (
        <Video type="feed" src={resource} />
      ) : (
        <Image className={styles.photo} src={resource} width="650" height="650" alt="post" quality={100} />
      )}
      <PostActions
        focusOnInput={() => {}}
        updateLikes={updateLikeCount}
        likes={postLikes}
        id={id}
        notify={notify}
      />
      <Likes likes={postLikes.length} />
      <CommentSection creator={username} description={description} comments={postComments} />
      <AddComment
        updateComments={(comment) => setComments([...postComments, comment])}
        postId={id}
      />
    </div>
  );
};

export default PostCard;
