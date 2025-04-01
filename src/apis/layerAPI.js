import httpInstance from "@/utils/https";

export function getLayer1API() {
  return httpInstance({
    url: '/v1/admin/layer/layer1/',
    method: 'get',
  })
}
export function getLayer2API() {
  return httpInstance({
    url: '/v1/admin/layer/layer2/',
    method: 'get',
  })
}
export function getLayerAPI() {
  return httpInstance({
    url: '/v1/admin/layer/',
    method: 'get',
  })
}
export function addLayer1API(data) {
  return httpInstance({
    url: '/v1/admin/layer/layer1/',
    method: 'post',
    data: data
  })
}
export function addLayer2API(data) {
  return httpInstance({
    url: '/v1/admin/layer/layer2/',
    method: 'post',
    data: data
  })
}
export function updateLayer1ByIdAPI(id, data) {
  return httpInstance({
    url: '/v1/admin/layer/layer1/' + id,
    method: 'post',
    data: data
  })
}
export function updateLayer2ByIdAPI(id, data) {
  return httpInstance({
    url: '/v1/admin/layer/layer2/' + id,
    method: 'post',
    data: data
  })
}
