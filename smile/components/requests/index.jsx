import { useState } from 'react';
import Image from 'next/image';
import Box from './box';
import styles from './index.module.css';

const Requests = () => {
  const [displayBox, setDisplay] = useState(false);

  const handleClick = () => {
    setDisplay(!displayBox);
  };

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={handleClick} type="button">
        <Image src="/heart.svg" alt="heart" width="28" height="28" />
      </button>
      {displayBox ? <Box /> : null}
    </div>
  );
};

export default Requests;
