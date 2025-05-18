import axios from "axios";

const apiFeirante = axios.create({
    baseURL: "http://localhost:7000/api"
})

apiFeirante.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiFeirante;