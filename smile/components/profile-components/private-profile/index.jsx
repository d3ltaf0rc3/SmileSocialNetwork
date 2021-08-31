import styles from './index.module.css';

const Private = () => {
  return (
    <section className={styles.container}>
      <div>
        <h2 className={styles.heading}>This Account is Private</h2>
        <div className={styles.paragraph}>Follow to see their photos and videos.</div>
      </div>
    </section>
  );
};

export default Private;
