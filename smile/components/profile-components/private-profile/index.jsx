import styles from './index.module.css';

const Private = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>This Account is Private</h2>
      <p className={styles.paragraph}>Follow to see their photos and videos.</p>
    </section>
  );
};

export default Private;
