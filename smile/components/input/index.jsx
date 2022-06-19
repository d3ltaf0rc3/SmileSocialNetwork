import styles from './index.module.css';

const Input = ({ name, value, onChange, onFocus, type = 'text', placeholder, label }) => {
  const id = `${placeholder.replace(' ', '_').toLowerCase()}_${Math.floor(
    100000 + Math.random() * 900000,
  )}`;

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
