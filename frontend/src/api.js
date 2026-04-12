import axios from "axios";

const api = axios.create({
  baseURL: "https://online-bookstore-uwqb.onrender.com/api",
});

export const getBooks = () => api.get("/books");

export const getCart = (userId) => api.get(`/cart/${userId}`);

export const addToCart = (data) => api.post("/cart", data);

export const clearCart = (userId) => api.delete(`/cart/${userId}`);

export default api;