import { useState } from 'react';

export default function FormHome({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
    onSubmit(formData, () => {
      setName('');
      setEmail('');
      setPhone('');
      setPictureFile(null);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="lead-name">Nome:</label>
      <input
        id="lead-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="lead-email" style={{ marginTop: '1rem' }}>Email:</label>
      <input
        id="lead-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="lead-phone" style={{ marginTop: '1rem' }}>Telefone:</label>
      <input
        id="lead-phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <label htmlFor="lead-picture" style={{ marginTop: '1rem' }}>Foto (opcional):</label>
      <input
        id="lead-picture"
        type="file"
        accept="image/*"
        onChange={(e) => setPictureFile(e.target.files[0])}
      />

      <button type="submit" style={{ marginTop: '1rem' }}>
        Cadastrar
      </button>
    </form>
  );
}