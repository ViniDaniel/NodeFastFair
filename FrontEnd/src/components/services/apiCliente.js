import axios from "axios";

const apiCliente = axios.create({
    baseURL: "http://localhost:7000/api"
})

apiCliente.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiCliente;