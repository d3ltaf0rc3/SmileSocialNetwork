import styles from './index.module.css';
import UserData from '../../user-data';

const PostHeader = ({ imageUrl, username, location, children }) => {
  return (
    <div className={styles['post-header']}>
      <UserData imageUrl={imageUrl} username={username} location={location} />
      {children}
    </div>
  );
};

export default PostHeader;
