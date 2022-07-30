import { useId } from 'react';
import styles from './index.module.css';

const ToggleButton = ({ defaultValue, onChange, label }) => {
  const id = useId();

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
