import axios from "axios";

const apiFeirante = axios.create({
    baseURL: "http://localhost:7000/api"
})

/*apiFeirante.interceptors.request.use((config) => {
  const feirante = JSON.parse(localStorage.getItem("feirante"));
  if (feirante?.token) {
    config.headers.Authorization = `Bearer ${feirante.token}`;
  }
  return config;
});*/

export default apiFeirante;