import styles from './index.module.css';

const ErrorComponent = ({ error }) => {
  return <div className={styles.container}>{error}</div>;
};

export default ErrorComponent;
