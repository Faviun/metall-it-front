import axios from "axios";

interface MyAxiosError<T = any> extends Error {
  config?: any;
  code?: string;
  request?: any;
  response?: {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
  };
  isAxiosError: boolean;
  toJSON: () => object;
}

function isMyAxiosError<T = any>(payload: any): payload is MyAxiosError<T> {
  return (payload as MyAxiosError).isAxiosError === true;
}

const $api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

$api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (!config.headers) {
      config.headers = {};
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: unknown) => {
    if (isMyAxiosError(error)) {
      const originalRequest = error.config;

      if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
        (originalRequest as any)._retry = true;

        console.log('Токен истек или недействителен. Попытка обновления...');

        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
          try {
            const refreshResponse = await axios.post<{ token: string, refreshToken: string }>(
              `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const newAuthToken = refreshResponse.data.token;
            const newRefreshToken = refreshResponse.data.refreshToken;

            localStorage.setItem('authToken', newAuthToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            if (!originalRequest.headers) {
                originalRequest.headers = {};
            }
            originalRequest.headers.Authorization = `Bearer ${newAuthToken}`;
            return axios(originalRequest);
          } catch (refreshError: unknown) {
            console.error('Ошибка при обновлении токена:', refreshError);
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        } else {
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(error);
        }
      }

      if (error.response) {
          const { status, data } = error.response;

          switch (status) {
              case 400:
                  console.error('Ошибка 400: Неверный запрос.', data);
                  break;
              case 403:
                  console.error('Ошибка 403: Доступ запрещен.', data);
                  break;
              case 404:
                  console.error('Ошибка 404: Ресурс не найден.', data);
                  break;
              case 422:
                  console.error('Ошибка 422: Ошибка валидации.', data);
                  break;
              case 500:
                  console.error('Ошибка 500: Внутренняя ошибка сервера.', data);
                  break;
              default:
                  console.error(`Неизвестная ошибка ${status}:`, data);
                  break;
          }
      } else if (error.request) {
          console.error('Сетевая ошибка: Сервер не отвечает или отсутствует интернет-соединение.', (error as MyAxiosError).message);
      } else {
          console.error('Ошибка настройки запроса:', (error as MyAxiosError).message);
      }
    } else if (error instanceof Error) {
        console.error('Непредвиденная ошибка:', error.message);
    } else {
        console.error('Неизвестный тип ошибки:', error);
    }

    return Promise.reject(error);
  }
);

export default $api;