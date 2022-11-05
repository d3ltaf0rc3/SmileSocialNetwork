import { useContext, useState } from 'react';
import Image from 'next/future/image';
import styles from './index.module.css';
import Actions from '../actions';
import AddComment from '../../add-comment';
import Likes from '../../feed-post-card/likes';
import PostComment from '../post-comment';
import PostHeader from '../../feed-post-card/header';
import PostMenu from '../post-menu';
import PostContext from '../../../contexts/postContext';
import UserContext from '../../../contexts/authContext';

const SideContent = ({ notify }) => {
  const post = useContext(PostContext);
  const user = useContext(UserContext);
  const [displayMenu, setDisplay] = useState(false);
  const [comments, setComments] = useState(post.comments);

  const handleClick = () => setDisplay(!displayMenu);

  return (
    <aside className={styles.aside}>
      <div className={styles.headerContainer}>
        <PostHeader
          imageUrl={post.postedBy.profilePicture}
          location={post.location}
          username={post.postedBy.username}
        />
        {post.postedBy?.username === user.username ? (
          <button className={styles.menuBtn} type="button" onClick={handleClick}>
            <Image className={styles.menuIcon} src="/menu.svg" alt="menu" width="15" height="15" />
          </button>
        ) : null}
        {displayMenu ? <PostMenu notify={notify} close={() => setDisplay(false)} /> : null}
      </div>
      <div className={styles.content}>
        <div className={styles.commentSection}>
          {post.description ? (
            <PostComment
              imageUrl={post.postedBy.profilePicture}
              author={post.postedBy.username}
              comment={post.description}
            />
          ) : null}
          {comments.map((comment) => (
            <PostComment
              key={comment._id}
              imageUrl={comment.postedBy.profilePicture}
              author={comment.postedBy.username}
              comment={comment.comment}
            />
          ))}
        </div>
        <Actions focusOnInput={() => {}} notify={notify} />
        <Likes likes={post.likes.length} />
        <AddComment
          updateComments={(comment) => setComments([...comments, comment])}
          postId={post._id}
        />
      </div>
    </aside>
  );
};

export default SideContent;
