import axios from 'axios';

// Línea de prueba para ver el resultado en la consola del navegador
console.log("Tu URL del Backend es:", import.meta.env.VITE_API_URL); 

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,

});
export const getDeportes = () => api.get("/deportes");

export default api;