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
      // children: [
      // ]
    }, {
      path: '/product',
      name: 'product',
      component: () => import('@/views/product.vue')
    }
  ],
})

export default router
