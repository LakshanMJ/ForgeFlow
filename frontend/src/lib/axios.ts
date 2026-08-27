import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const accessToken =
    localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization =
      `Bearer ${accessToken}`;
  }

  return config;
});

// Handle expired access token
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          localStorage.getItem('refreshToken');

        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // Get new tokens
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            refreshToken,
          },
        );

        const {
          accessToken,
          refreshToken: newRefreshToken,
        } = response.data;

        // Store new tokens
        localStorage.setItem(
          'accessToken',
          accessToken,
        );

        localStorage.setItem(
          'refreshToken',
          newRefreshToken,
        );

        // Put new access token on original request
        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;

        // Retry original request
        return api(originalRequest);

      } catch (refreshError) {
        // Refresh token is also invalid/expired
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        window.location.href = '/login';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;