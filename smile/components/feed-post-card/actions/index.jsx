import Image from 'next/future/image';
import { useContext } from 'react';
import UserContext from '../../../contexts/authContext';
import styles from './index.module.css';

const PostActions = ({ id, updateLikes, focusOnInput, notify, likes }) => {
  const user = useContext(UserContext);

  const handleClick = (action) => {
    fetch('/api/post/handleAction', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        action,
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
    <div className={styles.container}>
      {likes.includes(user._id) ? (
        <button type="button" onClick={() => handleClick('unlike')}>
          <Image src="/red-heart.svg" alt="heart" width="25" height="25" />
        </button>
      ) : (
        <button type="button" onClick={() => handleClick('like')}>
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
