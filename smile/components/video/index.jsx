import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';

const Video = ({ type, src }) => {
  const [showButton, setShow] = useState(true);
  const videoRef = useRef();

  const setVideoPlayback = () => {
    if (showButton) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setShow(!showButton);
  };

  return (
    <div className={styles.container}>
      {showButton ? (
        <div className={styles[`${type}Btn`]}>
          <Image src="/play.png" alt="play" width="128" height="71" />
        </div>
      ) : null}
      <video
        ref={videoRef}
        onClick={setVideoPlayback}
        playsInline
        className={styles[type]}
        src={src}
        alt="post"
        loop
      />
    </div>
  );
};

export default Video;
