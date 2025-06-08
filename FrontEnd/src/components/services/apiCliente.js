import axios from "axios";

const apiCliente = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

apiCliente.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiCliente;