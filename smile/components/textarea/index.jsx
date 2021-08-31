import styles from './index.module.css';

const Textarea = ({ value, onChange, placeholder }) => {
  return (
    <div className={styles.container}>
      <textarea defaultValue={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default Textarea;
