import request from '@/utils/request'

export function getProductList(params) {
  return request({
    url: '/user/productList',
    method: 'get',
    query: params
  })
}