import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import LeadCard from '../components/cards/LeadCard';
import UserCard from '../components/cards/UserCard';
import { getLeads, createLead, deleteLead, updateLead, searchLeads } from '../api/leads';
import axios from 'axios';
import PatchLead from '../components/popups/patch_lead';
import InputSearch from '../components/inputs/InputSearch';
import FormHome from '../components/forms/form_home';

export default function Home() {
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

  const handleCreateLead = async (formData, resetForm) => {
    try {
      await createLead(formData);
      fetchLeads();
      resetForm();
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
        <h2 style={{ fontSize: '1.2rem', paddingTop: '2rem' }}>Cadastrar Lead</h2>
        <FormHome onSubmit={handleCreateLead} />
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', paddingTop: '2rem' }}>Leads</h2>
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
        <h2 style={{ fontSize: '1.2rem', paddingTop: '2rem' }}>Usuários Aleatórios</h2>
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
