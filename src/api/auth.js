import axios from 'axios';

const API = axios.create({
  baseURL: '/',
});
// baseURL: process.env.REACT_APP_API_BASE_URL,

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const loginRequest = (email, password) =>
  API.post('/auth/login', { email, password });

export const registerRequest = (email, password) =>
  API.post('/auth/register', { email, password });
