import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import LeadCard from '../components/cards/LeadCard';
import UserCard from '../components/cards/UserCard';
import { getLeads, createLead, deleteLead, updateLead, searchLeads } from '../api/leads';
import axios from 'axios';
import PatchLead from '../components/popups/patch_lead';
import InputSearch from '../components/inputs/InputSearch';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pictureFile, setPictureFile] = useState(null);
  const [leads, setLeads] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const [editingLead, setEditingLead] = useState(null);

  const fetchLeads = async () => {
    try {
      const res = await getLeads();
      setLeads(res.data);
    } catch (err) {
      console.error('Erro ao buscar leads', err);
    }
  };

  useEffect(() => {
    fetchLeads();
    axios
      .get(`${process.env.REACT_APP_RANDOMUSER_API}/?results=10`)
      .then((res) => setRandomUsers(res.data.results))
      .catch((err) => console.error('Erro ao buscar usuários', err));
  }, []);

  const handleCreateLead = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    if (pictureFile) {
      formData.append('image', pictureFile);
    }

    try {
      await createLead(formData);
      setName('');
      setEmail('');
      setPhone('');
      setPictureFile(null);
      fetchLeads();
    } catch (err) {
      console.error('Erro ao criar lead', err);
    }
  };

  const handleDeleteLead = async (id) => {
    try {
      await deleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error('Erro ao deletar lead', err);
    }
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
  };

  const handleSaveEdit = async (id, formData) => {
    try {
      await updateLead(id, formData);
      setEditingLead(null);
      fetchLeads();
    } catch (err) {
      console.error('Erro ao atualizar lead', err);
    }
  };

  const handleSearch = async (query) => {
    if (!query) {
      fetchLeads();
      return;
    }
    try {
      const res = await searchLeads(query);
      setLeads(res.data);
    } catch (err) {
      console.error('Erro ao buscar leads', err);
    }
  };

  return (
    <Layout>
      <InputSearch onSearch={handleSearch} />
      <section style={{ marginBottom: '2rem' }}>
        <h2>Cadastrar Lead</h2>
        <form onSubmit={handleCreateLead}>
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
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Leads</h2>
        {leads.length === 0 ? (
          <p>Nenhum lead cadastrado.</p>
        ) : (
          <div>
            {leads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onDelete={handleDeleteLead}
                onEdit={handleEditLead}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Usuários Aleatórios</h2>
        {randomUsers.length === 0 ? (
          <p>Carregando usuários...</p>
        ) : (
          <div>
            {randomUsers.map((user) => (
              <UserCard key={user.login.uuid} user={user} />
            ))}
          </div>
        )}
      </section>

      {editingLead && (
        <PatchLead
          lead={editingLead}
          onClose={() => setEditingLead(null)}
          onSave={handleSaveEdit}
        />
      )}
    </Layout>
  );
}
