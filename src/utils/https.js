// axios基礎封裝
import axios from 'axios'
// import { useUsersStore } from '@/stores/users'
const httpInstance = axios.create({
  // baseURL: '/api',
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  withCredentials: true, // 允許攜帶 cookie
  withXSRFToken: true, // 允許攜帶 XSRF token
})

// 請求攔截器
httpInstance.interceptors.request.use(function (config) {
  // 在發送請求之前做一些事情
  return config;
}, function (error) {
  // 對請求錯誤做些什麼
  return Promise.reject(error);
});

// 添加響應攔截器
httpInstance.interceptors.response.use(function (response) {
  // 2xx 範圍內的狀態碼會觸發該函數。
  // 對響應數據做點什麼
  return response;
}, function (error) {
  // 超出 2xx 範圍的狀態碼會觸發該函數。
  // 對響應錯誤做點什麼
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data.message;
    console.log(`狀態碼 ${status}: ${message}`);
    // 根據狀態碼進行相應的處理
    switch (status) {
      case 401: // 未登入
        console.log('未授權');
        // const usersStore = useUsersStore()
        // usersStore.logout();
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
