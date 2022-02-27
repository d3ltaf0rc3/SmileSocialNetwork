import styles from './index.module.css';

const Notification = ({ text, type }) => {
  const prefixes = {
    failure: 'Oh snap!',
    success: 'Woop woop!',
  };

  return (
    <div className={`${styles.container} ${styles[type]}`}>
      <strong>{prefixes[type]}</strong> {text}
    </div>
  );
};

export default Notification;
