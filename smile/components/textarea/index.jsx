import styles from './index.module.css';

const Textarea = ({ value, onChange, placeholder, label }) => {
  const id = `${placeholder.replace(' ', '_').toLowerCase()}_${Math.floor(
    100000 + Math.random() * 900000,
  )}`;

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
