import { useState, useContext, useEffect } from 'react';
import Input from '../../input';
import Textarea from '../../textarea';
import PostContext from '../../../contexts/postContext';
import styles from './index.module.css';

const Edit = ({ notify, close }) => {
  const post = useContext(PostContext);
  const [location, setLocation] = useState(post.location);
  const [description, setDescription] = useState(post.description);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (location === post.location && description === post.description) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [location, description]);

  const editPost = () => {
    fetch(`/api/post/edit?id=${post._id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location,
        description,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          post.updatePost({ ...post, location, description });
          close();
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
      <form className={styles.form}>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Caption..."
        />
        <button className={styles.btn} onClick={editPost} type="button" disabled={disabled}>
          Save changes
        </button>
      </form>
    </div>
  );
};

export default Edit;
