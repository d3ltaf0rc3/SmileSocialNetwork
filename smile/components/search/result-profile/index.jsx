import styles from './index.module.css';
import UserData from '../../feed-post-card/header';

const Profile = ({ imageUrl, username }) => {
  return (
    <div className={styles.container}>
      <UserData imageUrl={imageUrl} username={username} />
    </div>
  );
};

export default Profile;
