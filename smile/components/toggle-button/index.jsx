import styles from './index.module.css';

const ToggleButton = ({ defaultValue, onChange, label }) => {
  const id = `${label.replace(' ', '_').toLowerCase()}_${Math.floor(
    100000 + Math.random() * 900000,
  )}`;

  return (
    <div className={styles.container}>
      <label htmlFor={id}>{label}</label>
      <input
        className={styles.switch}
        onChange={onChange}
        defaultChecked={defaultValue}
        id={id}
        type="checkbox"
      />
    </div>
  );
};

export default ToggleButton;
