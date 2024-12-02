import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-bcc-2-b.vercel.app',
});

export const registerUser = async (user) => {
  return await api.post('/usuario', user);
};

export const loginUser = async (credentials) => {
  return await api.post('/usuario/login', credentials);
};

export const fetchMessages = async () => {
  return await api.get('/mensagem');
};

export const sendMessage = async (message) => {
  return await api.post('/mensagem', message);
};

export const updateMessageStatus = async (id, status) => {
  return await api.patch(`/mensagem/${id}`, { status });
};

export const deleteMessage = async (id) => {
  return await api.delete(`/mensagem/${id}`);
};

export const verifyPassword = async (password) => {
  return await api.post('/usuario/verificarSenha', { password });
};
