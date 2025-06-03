import { useState } from 'react';
import styles from './styles/inputSearch.module.css';

export default function InputSearch({ onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    onSearch(val);
  };

  return (
    <div className={styles.inputSearchWrapper}>
      <input
        type="text"
        placeholder="Buscar lead por nome ou email..."
        value={value}
        onChange={handleChange}
        className={styles.inputSearchInput}
      />
    </div>
  );
}