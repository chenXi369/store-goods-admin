import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

// 添加分类
export function addCategory(data) {
  return request({
    url: '/category/add',
    method: 'post',
    data
  })
}

// 删除分类
export function deleteCategory(id) {
  return request({
    url: `/category/del/${id}`,
    method: 'delete'
  })
}

// 查询分类
export function getCategory(data) {
  return request({
    url: '/category/list',
    method: 'post',
    data
  })
}

// 修改分类
export function updateCategory(data) {
  return request({
    url: '/category/update',
    method: 'post',
    data
  })
}
