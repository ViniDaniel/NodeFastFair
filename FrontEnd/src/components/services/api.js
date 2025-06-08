import axios from "axios"

const api = axios.create({
    baseURL: "https://nodefastfair.onrender.com/api"
})

export default api

/*baseURL: "https://nodefastfair.onrender.com/api"
baseURL: "http://localhost:7000/api"
*/