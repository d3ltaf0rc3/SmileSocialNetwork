import { useContext } from 'react';
import Image from 'next/future/image';
import styles from './index.module.css';
import PostContext from '../../../contexts/postContext';
import UserContext from '../../../contexts/authContext';

const PostActions = ({ notify, focusOnInput }) => {
  const post = useContext(PostContext);
  const user = useContext(UserContext);

  const updateLikes = (action) => {
    if (action === 'like') {
      post.updatePost({ ...post, likes: [...post.likes, user._id] });
    } else {
      post.updatePost({ ...post, likes: post.likes.filter((usr) => usr !== user._id) });
    }
  };

  const handleAction = (action) => {
    fetch('/api/post/handleAction', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        id: post._id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          updateLikes(action);
        } else {
          notify(res.data, { type: 'failure' });
        }
      })
      .catch(() => {
        notify('Our servers are currently unreachable. Try again later!', { type: 'failure' });
      });
  };

  return (
    <div className={styles.actionsContainer}>
      {post.likes.includes(user._id) ? (
        <button type="button" onClick={() => handleAction('unlike')}>
          <Image src="/red-heart.svg" alt="heart" width="25" height="25" />
        </button>
      ) : (
        <button type="button" onClick={() => handleAction('like')}>
          <Image src="/heart.svg" alt="heart" width="25" height="25" />
        </button>
      )}
      <button type="button" onClick={focusOnInput}>
        <Image src="/comment.svg" alt="comment" width="25" height="25" />
      </button>
    </div>
  );
};

export default PostActions;
