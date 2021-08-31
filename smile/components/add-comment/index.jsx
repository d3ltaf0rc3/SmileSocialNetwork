import { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';

const AddComment = ({ id, setUpdate }) => {
  const [comment, setComment] = useState('');

  const addComment = () => {
    if (comment.trim() !== '') {
      fetch(`${process.env.REACT_APP_API_URL}/api/posts/add/comment/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          comment,
        }),
      })
        .then(() => {
          setComment('');
          setUpdate();
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className={styles['add-comment']}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        id={id}
        placeholder="Add a comment..."
      />
      <button type="button" onClick={addComment}>
        <Image src="/next.svg" alt="arrow" width="20" height="20" />
      </button>
    </div>
  );
};

export default AddComment;
