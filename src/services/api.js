// D:\client_CarPassion4\src\services\api.js
import axios from 'axios';

const baseURL = 'https://car-passion-server-may11.onrender.com/api'

// Add retry logic for mobile devices
const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout for mobile connections
  timeout: 15000,
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  async error => {
    // Log more details about the error
    const config = error.config

    if(error.message === 'Network Error' && !config._retry){
      config._retry = true;
      
      // Wait 1 second before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return api(config);
    }
    return Promise.reject(error);
  }
);

export default api;