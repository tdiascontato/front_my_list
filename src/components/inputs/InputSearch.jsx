import { useState } from 'react';

export default function InputSearch({ onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    onSearch(val);
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <input
        type="text"
        placeholder="Buscar lead por nome ou email..."
        value={value}
        onChange={handleChange}
        style={{ width: '100%', padding: '0.5rem' }}
      />
    </div>
  );
}