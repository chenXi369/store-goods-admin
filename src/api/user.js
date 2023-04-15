import request from '@/utils/request'

// 用户登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取登录用户信息
export function getInfo() {
  return request({
    url: '/user/info',
    method: 'post'
  })
}

// 修改用户信息
export function updateUserInfo(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
