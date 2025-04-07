import httpInstance from "@/utils/https";

export function addOrderAPI(data) {
  return httpInstance({
    url: '/v1/order',
    method: 'post',
    data: data
  })
}
export function OrderListAPI() {
  return httpInstance({
    url: '/v1/order',
    method: 'get',
  })
}
// 修改訂單狀態
export function updateOrderAPI(id, data) {
  return httpInstance({
    url: `/v1/order/${id}`,
    method: 'post',
    data: data
  })
}
