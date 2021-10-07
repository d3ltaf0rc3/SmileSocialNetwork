import styles from './index.module.css';

const Textarea = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      className={styles.textarea}
      defaultValue={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Textarea;
