import { useContext } from 'react';
import styles from './index.module.css';
import UserContext from '../../../contexts/authContext';
import UserData from '../../user-data';

const Request = ({ imageUrl, username, id }) => {
  const context = useContext(UserContext);

  const acceptRequest = () => {
    handleRequest('accept', id, context.triggerUpdate);
  };

  const declineRequest = () => {
    handleRequest('decline', id, context.triggerUpdate);
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <UserData imageUrl={imageUrl} username={username} />
        <span className={styles.span}>has requested to follow you.</span>
      </div>
      <div className={styles.btns}>
        <button onClick={acceptRequest} type="button" className={styles.btn}>
          Accept
        </button>
        <button onClick={declineRequest} type="button" className={`${styles.btn} ${styles.remove}`}>
          Decline
        </button>
      </div>
    </div>
  );
};

export default Request;
