import { useState } from 'react';
import styles from './styles/patchLead.module.css';

export default function PatchLead({ lead, onClose, onSave }) {
  const [name, setName] = useState(lead.name);
  const [email, setEmail] = useState(lead.email);
  const [phone, setPhone] = useState(lead.phone);
  const [pictureFile, setPictureFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    if (pictureFile) {
      formData.append('image', pictureFile);
    }
    onSave(lead.id, formData);
  };

  return (
    <div className={styles.popupBg}>
      <div className={styles.card}>
        <h2 className={styles.title}>Editar Lead</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input value={name} onChange={e => setName(e.target.value)} required />

          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <label>Telefone:</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} required />

          <label>Foto (opcional):</label>
          <input type="file" accept="image/*" onChange={e => setPictureFile(e.target.files[0])} />

          <div className={styles.actions}>
            <button type="submit" className={styles.saveBtn}>Salvar</button>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}