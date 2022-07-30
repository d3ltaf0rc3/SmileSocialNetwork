import { useId } from 'react';
import styles from './index.module.css';

const Input = ({ name, value, onChange, onFocus, type = 'text', placeholder, label }) => {
  const id = useId();

  return (
    <div className={styles.inputGroup}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <div className={styles.container}>
        <input
          id={id}
          className={styles.input}
          name={name}
          autoComplete="off"
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          onFocus={onFocus}
        />
      </div>
    </div>
  );
};

export default Input;
