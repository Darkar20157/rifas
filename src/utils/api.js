// src/utils/api.js
import axios from "axios";

// ✅ URL base de tus funciones (ajústala según tu deploy)
const BASE_URL = "https://us-central1-rifas-app-backend.cloudfunctions.net";

export const reserveTicket = async (number, name, phone) => {
  const res = await axios.post(`${BASE_URL}/reserveTicket`, { number, name, phone });
  return res.data;
};

export const confirmTicket = async (number) => {
  const res = await axios.post(`${BASE_URL}/confirmTicket`, { number });
  return res.data;
};

export const rejectTicket = async (number) => {
  const res = await axios.post(`${BASE_URL}/rejectTicket`, { number });
  return res.data;
};

export const getStats = async () => {
  const res = await axios.get(`${BASE_URL}/getStats`);
  return res.data;
};

export const getTickets = async () => {
  const res = await axios.get(`${BASE_URL}/getTickets`);
  return res.data;
};
