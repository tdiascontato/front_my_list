import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getLeads = () => API.get('/leads/');
export const createLead = (data) => API.post('/leads/', data);
export const deleteLead = (id) => API.delete(`/leads/${id}`);
export const updateLead = (id, data) => API.patch(`/leads/${id}`, data);
export const searchLeads = (q) => API.get(`/leads/search?q=${encodeURIComponent(q)}`);
