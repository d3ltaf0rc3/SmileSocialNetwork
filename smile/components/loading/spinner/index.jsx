import styles from './index.module.css';

const Spinner = ({ withWrapper = false }) => {
  if (withWrapper) {
    return (
      <div className={styles.container}>
        <div className={styles.loader} />
      </div>
    );
  }

  return <div className={styles.loader} />;
};

export default Spinner;
