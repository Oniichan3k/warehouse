
import { getRefreshToken } from '@/api/userAPI/user';
import axios from 'axios';

const createAxiosInstance = (baseURL) => {
  return axios.create({
    baseURL,
  });
};

const createAuthInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.response.use(
    (response) => response, async (error) => {
      console.log("error", error);
      if (error.response.status === 401) {
        try {
          //api refreshToken
          const data = await getRefreshToken();
          console.log("data", data);
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

          instance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

          return instance;
        } catch (error) {
          console.error(error);
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);

    }
  );

  return instance;
};

const publicInstance = createAxiosInstance(process.env.NEXT_PUBLIC_APP_URL_BE);
const authInstance = createAuthInstance(process.env.NEXT_PUBLIC_APP_URL_BE);


const request = (instance, config) => {
  return instance({ ...config });
};

const requestWithToken = (instance, config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('Bạn cần đăng nhập để thực hiện chức năng này!');
  }

  return instance({
    ...config,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export { publicInstance, authInstance, request, requestWithToken };