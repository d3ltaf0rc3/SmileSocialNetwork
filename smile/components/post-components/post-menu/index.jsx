import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import PostContext from '../../../contexts/postContext';
import Edit from '../edit';

const PostMenu = ({ setUpdate, closeMenu }) => {
  const post = useContext(PostContext);
  const [displayEdit, setDisplay] = useState(false);
  const router = useRouter();

  const deletePost = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/posts/delete/${post._id}`, {
      method: 'delete',
      credentials: 'include',
    })
      .then(() => router.push('/'))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className={styles.arrow} />
      <div className={styles['menu-box']}>
        <button onClick={() => setDisplay(true)} type="button" className={styles.option}>
          Edit
        </button>
        <button onClick={deletePost} type="button" className={styles.option}>
          Delete
        </button>
      </div>
      {displayEdit ? <Edit setUpdate={setUpdate} closeMenu={closeMenu} /> : null}
    </div>
  );
};

export default PostMenu;
