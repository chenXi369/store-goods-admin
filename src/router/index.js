import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/products',
    meta: { title: '产品管理', icon: 'product' },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/products/index'),
        meta: { title: '商品管理', icon: 'form' }
      },
      {
        path: 'classify',
        name: 'Classify',
        component: () => import('@/views/products/classify'),
        meta: { title: '分类管理', icon: 'form' }
      },
      {
        path: 'areaList',
        name: 'AreaList',
        component: () => import('@/views/products/area'),
        meta: { title: '区域列表', icon: 'form' }
      },
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'User',
    meta: { title: '用户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'consumer',
        name: 'Consumer',
        component: () => import('@/views/user/consumer/index'),
        meta: { title: '信息管理', icon: 'table' }
      },
      {
        path: '/userInfo',
        name: 'UserInfo',
        hidden: true,
        component: () => import('@/views/dashboard/user'),
        meta: { title: '个人中心', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/evalManagement',
    component: Layout,
    children: [
      {
        path: 'evalManagement',
        name: 'EvalManagement',
        component: () => import('@/views/evalManagement/index'),
        meta: { title: '评价管理', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
