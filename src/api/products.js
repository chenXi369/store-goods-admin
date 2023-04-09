import request from '@/utils/request'

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
