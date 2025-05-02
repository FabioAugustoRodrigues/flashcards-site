import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default {
  getAll(leitner=false) {
    if (leitner) {
      return axios.get(`${API_URL}/cards?searchType=leitner`);
    }
    return axios.get(`${API_URL}/cards`);
  },
  getById(id) {
    return axios.get(`${API_URL}/cards/${id}`);
  },
  create(card) {
    return axios.post(`${API_URL}/cards`, card);
  },
  update(id, card) {
    return axios.put(`${API_URL}/cards/${id}`, card);
  },
  delete(id) {
    return axios.delete(`${API_URL}/cards/${id}`);
  },
};