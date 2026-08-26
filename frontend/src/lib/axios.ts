// lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g., https://api.forgeflow.dev
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  console.log('JWT TOKEN:', token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// Response Interceptor: Handle Silent Token Refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Logic to call /auth/refresh and get a new token
      // Then retry the original request
    }
    return Promise.reject(error);
  }
);

export default api;