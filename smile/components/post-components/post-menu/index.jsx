import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Edit from '../edit';
import styles from './index.module.css';
import PostContext from '../../../contexts/postContext';

const PostMenu = ({ notify, close }) => {
  const post = useContext(PostContext);
  const [displayEdit, setDisplay] = useState(false);
  const router = useRouter();

  const handleClick = () => setDisplay(true);

  const deletePost = () => {
    fetch(`/api/post/delete?id=${post._id}`, {
      method: 'delete',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          router.push('/');
        } else {
          notify(res.data, { type: 'failure' });
        }
      })
      .catch(() => {
        notify('Our servers are currently unreachable. Try again later!', { type: 'failure' });
      });
  };

  return (
    <div className={styles.boxContainer}>
      <button onClick={handleClick} type="button" className={styles.option}>
        Edit
      </button>
      <button onClick={deletePost} type="button" className={styles.option}>
        Delete
      </button>
      {displayEdit ? <Edit notify={notify} close={close} /> : null}
    </div>
  );
};

export default PostMenu;
