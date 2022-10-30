import { useEffect, useState } from 'react';
import styles from './index.module.css';

const AddComment = ({ postId, updateComments }) => {
  const [comment, setComment] = useState('');
  const [isValid, setValid] = useState(false);
  const [rows, setRows] = useState(1);
  const textareaLineHeight = 18;
  const minRows = 1;
  const maxRows = 4;

  useEffect(() => {
    if (comment.length > 0 && comment.length <= 150) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [comment]);

  const handleChange = (e) => {
    const previousRows = e.target.rows;
    e.target.rows = minRows;

    const currentRows = parseInt(e.target.scrollHeight / textareaLineHeight, 10);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }

    setRows(currentRows < maxRows ? currentRows : maxRows);
    setComment(e.target.value);
  };

  const addComment = () => {
    if (isValid) {
      fetch(`${window.location.origin}/api/comment/add?id=${postId}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: comment.trim(),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            updateComments(res.data);
            setComment('');
            setRows(1);
          } else {
            console.log(res.data);
          }
          setValid(false);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className={styles.container}>
      <textarea
        value={comment}
        onChange={handleChange}
        placeholder="Add a comment..."
        rows={rows}
        maxLength="150"
      />
      <button disabled={!isValid} type="button" onClick={addComment}>
        Post
      </button>
    </div>
  );
};

export default AddComment;
