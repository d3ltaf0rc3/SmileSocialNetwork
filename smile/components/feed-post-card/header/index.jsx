import styles from './index.module.css';
import UserData from '../../user-data';

const PostHeader = ({ imageUrl, username, location }) => {
  return (
    <div className={styles.postHeader}>
      <UserData imageUrl={imageUrl} username={username} location={location} />
    </div>
  );
};

export default PostHeader;
