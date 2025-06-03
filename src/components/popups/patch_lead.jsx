import { useState } from 'react';

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
    <div className="popup-bg" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div className="card" style={{ maxWidth: 400, width: '100%' }}>
        <h2>Editar Lead</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input value={name} onChange={e => setName(e.target.value)} required />

          <label style={{ marginTop: '1rem' }}>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <label style={{ marginTop: '1rem' }}>Telefone:</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} required />

          <label style={{ marginTop: '1rem' }}>Foto (opcional):</label>
          <input type="file" accept="image/*" onChange={e => setPictureFile(e.target.files[0])} />

          <div style={{ marginTop: '1rem', display: 'flex', gap: 8 }}>
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose} style={{ background: '#ccc', color: '#333' }}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}