import { useState, useContext } from 'react';
import styles from './index.module.css';
import Input from '../../input';
import Textarea from '../../textarea';
import PostContext from '../../../contexts/postContext';

const Edit = (props) => {
  const post = useContext(PostContext);
  const [location, setLocation] = useState(post.location);
  const [description, setDescription] = useState(post.description);

  const editPost = (e) => {
    e.preventDefault();

    if (location !== post.location || description !== post.description) {
      fetch(`${process.env.REACT_APP_API_URL}/api/posts/edit/${post._id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          location,
          description,
        }),
      })
        .then(() => {
          props.closeMenu();
          props.setUpdate();
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          type="text"
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Caption..."
        />
        <button onClick={editPost} type="button" className={styles.btn}>
          Save changes
        </button>
      </form>
    </div>
  );
};

export default Edit;
