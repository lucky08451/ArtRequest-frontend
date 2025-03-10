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
