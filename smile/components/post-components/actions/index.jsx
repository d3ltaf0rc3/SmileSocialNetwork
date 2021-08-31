import { useContext } from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import PostContext from '../../../contexts/postContext';
import UserContext from '../../../contexts/authContext';

const PostActions = (props) => {
  const post = useContext(PostContext);
  const user = useContext(UserContext);

  const likePost = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/posts/action/like/${post._id}`, {
      method: 'put',
      credentials: 'include',
    })
      .then(() => props.setUpdate())
      .catch((err) => console.error(err));
  };

  const unlikePost = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/posts/action/unlike/${post._id}`, {
      method: 'put',
      credentials: 'include',
    })
      .then(() => props.setUpdate())
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles['post-actions']}>
      <span>
        {post.likes.includes(user.user._id) ? (
          <button type="button" onClick={unlikePost}>
            <Image src="/heart.svg" width="25" height="25" alt="heart" />
          </button>
        ) : (
          <button type="button" onClick={likePost}>
            <Image src="/heart.svg" alt="heart" width="25" height="25" />
          </button>
        )}
      </span>
      <Image src="/comment.svg" alt="comment" width="25" height="25px" />
    </div>
  );
};

export default PostActions;
