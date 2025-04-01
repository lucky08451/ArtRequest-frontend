// axios基礎封裝
import axios from 'axios'
import { useUsersStore } from '@/stores/users'
const httpInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  withCredentials: true // 允許攜帶 cookie
})

// 請求攔截器
httpInstance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
httpInstance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data.message;
    console.log(`狀態碼 ${status}: ${message}`);
    // 根據狀態碼進行相應的處理
    switch (status) {
      case 401:
        console.log('未授權');
        const usersStore = useUsersStore()
        usersStore.logout();
        break;
      case 403:
        console.log('禁止訪問');
        break;
      case 404:
        console.log('請求地址錯誤');
        break;
      default:
        console.log(message);
    }
    return Promise.resolve(error.response.data);
  }
  return Promise.reject(error);
});

export default httpInstance
