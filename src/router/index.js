import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue'),
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('@/views/product.vue')
    },
    {
      path: '/productDetail',
      name: 'productDetail',
      component: () => import('@/views/productDetail.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/cart.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/order.vue')
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: () => import('@/views/orderDetail.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search.vue')
    },
    {
      path: '/mycenter',
      name: 'mycenter',
      component: () => import('@/views/mycenter.vue')
    }
  ],
})

export default router
