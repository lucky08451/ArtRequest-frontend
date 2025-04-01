import httpInstance from "@/utils/https";

export function listAPI() {
  return httpInstance({
    url: '/v1/user/',
    method: 'get',
  })
}
export function getUserIdAPI(id) {
  return httpInstance({
    url: `/v1/user/${id}/`,
    method: 'get',
  })
}
export function updateAPI(id, data) {
  return httpInstance({
    url: `/v1/user/${id}/`,
    method: 'post',
    data: data,
  })
}
