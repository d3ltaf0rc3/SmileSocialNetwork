import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';

const Video = ({ type, videoUrl }) => {
  const [hideButton, setHide] = useState(false);
  const videoRef = useRef(null);

  const setVideoPlayback = () => {
    if (!hideButton) {
      setHide(true);
      videoRef.current.play();
    } else {
      setHide(false);
      videoRef.current.pause();
    }
  };

  return (
    <div className={styles['video-container']}>
      {hideButton ? null : (
        <div className={type === 'feed' ? styles['feed-button'] : styles['play-button']}>
          <Image src="/play.png" alt="play" width="50" height="50" />
        </div>
      )}
      <video
        ref={videoRef}
        onClick={setVideoPlayback}
        className={type === 'feed' ? styles['feed-post'] : styles['post-image']}
        src={videoUrl}
        alt="post"
        loop
      />
    </div>
  );
};

export default Video;
