import ContentLoader from 'react-content-loader';
import styles from './index.module.css';

const PostCardLoader = (props) => (
  <div className={styles.container}>
    <ContentLoader
      speed={2}
      width={650}
      height={560}
      viewBox="0 0 650 560"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="31" cy="31" r="15" />
      <rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
      <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
      <rect x="0" y="60" rx="2" ry="2" width="650" height="480" />
    </ContentLoader>
  </div>
);

export default PostCardLoader;
