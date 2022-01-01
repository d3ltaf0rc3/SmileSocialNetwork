import styles from './index.module.css';

const Input = ({ name, value, onChange, onFocus, type = 'text', placeholder }) => {
  return (
    <div className={styles.container}>
      <input
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
  );
};

export default Input;
