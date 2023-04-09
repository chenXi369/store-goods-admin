import request from '@/utils/request'

// 商品列表
export function getProductList(data) {
  return request({
    url: '/product/list',
    method: 'post',
    data
  })
}

// 文件上传
export function fileUpload(data) {
  return request({
    url: '/file/upload',
    method: 'post',
    data
  })
}

// 区域列表
export function getAreaList(query) {
  return request({
    url: '/area/list',
    method: 'get',
    params: query
  })
}

// 添加商品
export function addProduct(data) {
  return request({
    url: '/product/add',
    method: 'post',
    data
  })
}

// 删除商品
export function delProduct(id) {
  return request({
    url: `/product/del/${id}`,
    method: 'delete',
    data
  })
}

// 修改商品
export function updateProduct(id) {
  return request({
    url: '/product/update',
    method: 'post',
    data
  })
}

// 评测商品
export function evaluationProduct(data) {
  return request({
    url: '/product/evaluation',
    method: 'post',
    data
  })
}
