import httpInstance from "@/utils/https";

export function loginAPI({ username, password }) {
  return httpInstance({
    url: '/v1/user/',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
