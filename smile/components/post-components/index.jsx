import { useState, useEffect } from 'react';
import Image from 'next/future/image';
import SideContent from './side-content';
import Video from '../video';
import PostContext from '../../contexts/postContext';
import styles from './index.module.css';
import PostLoader from '../loading/post';

const Post = ({ id, closePost, notify }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`${window.location.origin}/api/post/get?id=${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setPost(res.data);
        } else {
          closePost();
        }
      })
      .catch(() => closePost());
  }, [id]);

  return (
    <PostContext.Provider value={{ ...post, updatePost: setPost }}>
      <div className={styles.postContainer}>
        <button className={styles.closeIcon} type="button" onClick={closePost}>
          <Image src="/close.svg" alt="close" height="24" width="24" />
        </button>
        {post ? (
          <div className={styles.post}>
            {post.resource_type === 'video' ? (
              <Video type="post" src={post.resource} />
            ) : (
              <Image
                className={styles.image}
                width="750"
                height="800"
                src={post.resource}
                alt="post"
                quality={100}
              />
            )}
            <SideContent notify={notify} />
          </div>
        ) : (
          <PostLoader />
        )}
      </div>
    </PostContext.Provider>
  );
};

export default Post;
