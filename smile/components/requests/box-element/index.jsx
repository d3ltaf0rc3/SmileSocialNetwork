import UserData from '../../user-data';
import styles from './index.module.css';

const Request = ({ imageUrl, username, id, update }) => {
  const handleRequest = (action) => {
    fetch(`${window.location.origin}/api/user/handleRequest`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        action,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          update();
        } else {
          console.error(res.data);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <UserData imageUrl={imageUrl} username={username} />
        <span className={styles.span}>has requested to follow you.</span>
      </div>
      <div className={styles.btns}>
        <button onClick={() => handleRequest('accept')} type="button" className={styles.btn}>
          Accept
        </button>
        <button onClick={() => handleRequest('deny')} type="button" className={`${styles.btn} ${styles.remove}`}>
          Decline
        </button>
      </div>
    </div>
  );
};

export default Request;
