import { useContext } from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import UserContext from '../../../contexts/authContext';

const PostActions = ({ setUpdate, id, likes }) => {
  const context = useContext(UserContext);

  const likePost = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/posts/action/like/${id}`, {
      method: 'put',
      credentials: 'include',
    })
      .then(() => setUpdate())
      .catch((err) => console.error(err));
  };

  const unlikePost = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/posts/action/unlike/${id}`, {
      method: 'put',
      credentials: 'include',
    })
      .then(() => setUpdate())
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles['post-actions']}>
      <span>
        {likes.includes(context.user._id) ? (
          <button type="button" onClick={unlikePost}>
            <Image src="/heart.svg" alt="heart" width="25" height="25" />
          </button>
        ) : (
          <button type="button" onClick={likePost}>
            <Image src="/heart.svg" alt="heart" width="25" height="25" />
          </button>
        )}
      </span>
      <button type="button">
        <Image src="/comment.svg" alt="comment" width="25" height="25" />
      </button>
    </div>
  );
};

export default PostActions;
