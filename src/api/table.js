import request from '@/utils/request'

export function getUserList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}
export function deleteUser(id) {
  return request({
    url: '/user/del/' + id,
    method: 'delete',
  })
}
export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

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

// 留言列表
export function getMeaasgeList(data) {
  return request({
    url: '/message/list',
    method: 'post',
    data
  })
}

// 删除留言
export function delMessage(id) {
  return request({
    url: '/message/del/' + id,
    method: 'delete'
  })
}

// 精选留言
export function starMessage(id) {
  return request({
    url: '/message/star/' + id,
    method: 'get'
  })
}
