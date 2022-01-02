import { useEffect, useState } from 'react';
import Image from 'next/image';
import Request from '../box-element';
import styles from './index.module.css';

const RequestsBox = () => {
  const [requests, setRequests] = useState(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetch(`${window.location.origin}/api/user/requests`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setRequests(res.data);
        } else {
          console.error(res.data);
        }
      })
      .catch((err) => console.error(err));
  }, [update]);

  if (requests === null) {
    return (
      <div className={styles.container}>
        <div className={styles.arrow} />
        <div style={{ textAlign: 'center', padding: '5px 0' }} className={styles.content}>
          <Image src="/loading.svg" width="50" height="50" alt="loading" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.arrow} />
      <div className={styles.content}>
        {requests.length === 0 ? (
          <div className={styles.error}>
            When people ask to follow you, you&apos;ll see their requests here.
          </div>
        ) : (
          requests.map((req) => (
            <Request
              key={req._id}
              id={req._id}
              username={req.username}
              imageUrl={req.profilePicture}
              update={() => setUpdate(!update)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RequestsBox;
