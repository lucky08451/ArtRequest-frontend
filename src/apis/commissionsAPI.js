import httpInstance from "@/utils/https";
export function commissionsListAPI(params) {
  return httpInstance({
    url: '/v1/commissions/',
    method: 'get',
    params: params
  })
}
export function commissionsByIdAPI(ID) {
  return httpInstance({
    url: '/v1/commissions/' + ID,
    method: 'get'
  })
}
// 獲取繪師的委託列表
export function getArtistCommissionsAPI(artistId) {
  return httpInstance({
    url: '/v1/commissions/artist/' + artistId,
    method: 'get',
  })
}
// 新增委託
export function addCommissionsAPI(data) {
  return httpInstance({
    url: '/v1/commissions/artist/',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 更新委託
export function updateCommissionAPI(commissionsId, data) {
  return httpInstance({
    url: '/v1/commissions/artist/' + commissionsId,
    method: 'post',
    data: data
  })
}
// 刪除委託
export function deleteCommissionAPI(commissionsId) {
  return httpInstance({
    url: '/v1/commissions/artist/' + commissionsId,
    method: 'delete',
  })
}
