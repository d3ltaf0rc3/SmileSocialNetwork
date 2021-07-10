import camera from '../../../images/camera.svg';
import styles from './index.module.css';

const NoPosts = () => {
    return (
        <div className={styles["empty-profile"]}>
            <img src={camera} alt="camera" />
            <span>No posts yet</span>
        </div>
    );
}

export default NoPosts;
