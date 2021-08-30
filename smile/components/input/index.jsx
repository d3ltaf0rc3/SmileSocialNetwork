import styles from './index.module.css';

const Input = ({ name, value, onChange, type, placeholder }) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        name={name}
        autoComplete="off"
        defaultValue={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
