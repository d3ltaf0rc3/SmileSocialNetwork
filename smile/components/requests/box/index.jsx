import { useContext } from 'react';
import styles from './index.module.css';
import Request from '../box-element';
import UserContext from '../../../contexts/authContext';

const RequestsBox = () => {
  const context = useContext(UserContext);

  if (!context.user) {
    return <div />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.arrow} />
      <div className={styles.box}>
        {context.user.requests.length === 0 ? (
          <div className={styles.error}>
            When people ask to follow you, you&apos;ll see their requests here.
          </div>
        ) : (
          context.user.requests.map((req) => (
            <Request
              id={req._id}
              username={req.username}
              imageUrl={req.profilePicture}
              key={req._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RequestsBox;
