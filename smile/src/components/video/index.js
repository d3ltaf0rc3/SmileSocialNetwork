import React, { useRef, useState } from 'react';
import styles from './index.module.css';
import playButton from '../../images/play.png';

const Video = (props) => {
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
        <div className={styles["video-container"]}>
            {hideButton ? null :
                <div className={props.type === "feed" ? styles["feed-button"] :styles["play-button"]}>
                    <img src={playButton} alt="play" />
                </div>}
            <video
                ref={videoRef}
                onClick={setVideoPlayback}
                className={props.type === "feed" ? styles["feed-post"] :styles["post-image"]}
                src={props.videoUrl}
                alt="post"
                loop />
        </div>
    )
};

export default Video;