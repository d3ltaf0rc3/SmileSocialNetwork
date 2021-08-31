import styles from './index.module.css';
import UserData from '../../feed-post-card/header';

const Profile = ({ location, imageUrl, username }) => {
  return (
    <div className={styles.container}>
      <UserData location={location} imageUrl={imageUrl} username={username} />
    </div>
  );
};

export default Profile;
