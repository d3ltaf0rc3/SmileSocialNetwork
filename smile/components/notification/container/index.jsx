import Notification from '../index';
import styles from './index.module.css';

const NotificationContainer = ({ notification }) => {
  return (
    <div className={styles.container}>
      {notification ? <Notification text={notification.message} type={notification.type} /> : null}
    </div>
  );
};

export default NotificationContainer;
