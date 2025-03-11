import httpInstance from "@/utils/https";

export function loginAPI({ username, password }) {
  return httpInstance({
    url: '/auth/login/',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
export function logoutAPI() {
  return httpInstance({
    url: '/auth/logout/',
    method: 'get'
  })
}
export function checkTokenAPI() {
  return httpInstance({
    url: '/auth/me/',
    method: 'get'
  })
}
export function registerAPI(regData) {
  return httpInstance({
    url: '/auth/register/',
    method: 'post',
    data: regData
  })
}
export function checkNameAPI({ username }) {
  return httpInstance({
    url: '/auth/checkName/',
    method: 'post',
    data: {
      username
    }
  })
}
