import UserData from '../../user-data';
import styles from './index.module.css';

const Profile = ({ imageUrl, username }) => {
  return (
    <div className={styles.container}>
      <UserData imageUrl={imageUrl} username={username} />
    </div>
  );
};

export default Profile;
