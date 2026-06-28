import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
    },
    {
      path: '/products/new',
      name: 'product-create',
      component: () => import('../views/ProductFormView.vue'),
    },
    {
      path: '/products/:id/edit',
      name: 'product-edit',
      component: () => import('../views/ProductFormView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
    },
    {
      path: '/users/new',
      name: 'user-create',
      component: () => import('../views/UserFormView.vue'),
    },
    {
      path: '/users/:id/edit',
      name: 'user-edit',
      component: () => import('../views/UserFormView.vue'),
    },
  ],
})

export default router
