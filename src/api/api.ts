import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_EXTERNAL_URL ; 

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export default api;