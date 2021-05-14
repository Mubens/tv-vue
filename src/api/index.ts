import axios from 'axios';
import router from '../route';

import { localStorage } from '../utils/storage';
import { Service } from './data';

const service = axios.create({
  baseURL: '/api',
  timeout: 300 * 1000
});

// 请求拦截器
service.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    if (res.data.errno === 0) {
      return res.data;
    } else if (res.data.errno === 2) {
      localStorage.removeItem('token');
      router.push({ path: '/sign_in' });
    }
    return Promise.reject(res);
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const UserService: Service.UserService = {
  signIn(data) {
    return service.post('/user/sign_in', { data });
  },
  register(data) {
    return service.post('/user/register', { data });
  },
  authEmail(email) {
    return service.post('/user/auth_email', { data: email });
  },
  authPhone(phone) {
    return service.post('/user/auth_phone', { data: phone });
  }
};

export const PlayService: Service.PlayService = {
  serachPlay(data) {
    return service.get('/play/search', { params: data });
  },
  searchTitle(keyword) {
    return service.get('/play/pre_search', { params: keyword });
  }
};
