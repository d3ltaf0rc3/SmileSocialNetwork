import { useId } from 'react';
import styles from './index.module.css';

const Textarea = ({ value, onChange, placeholder, label }) => {
  const id = useId();

  return (
    <div className={styles.group}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <textarea
        id={id}
        className={styles.textarea}
        defaultValue={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Textarea;
