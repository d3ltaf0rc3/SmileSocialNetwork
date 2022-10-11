import ContentLoader from 'react-content-loader';
import styles from './index.module.css';

const PostLoader = (props) => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.imageHolder} />
      <div className={styles.sideContent}>
        <div className={styles.postHeader}>
          <ContentLoader
            speed={2}
            width={400}
            height={60}
            viewBox="0 0 400 60"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
          >
            <circle cx="31" cy="31" r="15" />
            <rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
            <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
          </ContentLoader>
        </div>
        <div className={styles.commentSection} />
        <div className={styles.actionSection}>
          <ContentLoader
            speed={2}
            width={400}
            height={60}
            viewBox="0 0 400 60"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
          >
            <rect x="18" y="18" rx="2" ry="2" width="150" height="10" />
            <rect x="18" y="34" rx="2" ry="2" width="180" height="10" />
            <rect x="18" y="50" rx="2" ry="2" width="120" height="10" />
          </ContentLoader>
        </div>
      </div>
    </div>
  );
};

export default PostLoader;
