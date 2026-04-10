import axios from "axios";

const api = axios.create({
  baseURL: "https://your-backend.onrender.com/api/books",
});

export default api;