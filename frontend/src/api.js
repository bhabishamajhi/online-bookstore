import axios from "axios";

const api = axios.create({
  baseURL: "https://online-bookstore-uwqb.onrender.com/api",
});

export const getBooks = () => api.get("/books");

export default api;