import { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import Box from './box';

const Requests = () => {
  const [displayBox, setDisplay] = useState(false);

  const handleClick = () => {
    setDisplay(!displayBox);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick} type="button">
        <Image src="/heart.svg" alt="heart" width="28" height="28" />
      </button>
      {displayBox ? <Box /> : null}
    </div>
  );
};

export default Requests;
