import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/start',
    },
    {
      path: '/start',
      name: 'start',
      component: () => import('../views/Starting.vue'),
    },
    {
      path: '/one',
      name: 'One',
      component: () => import('../views/One.vue'),
    },
    {
      path: '/two',
      name: 'Two',
      component: () => import('../views/Two.vue'),
    },
    {
      path: '/three',
      name: 'Three',
      component: () => import('../views/Three.vue'),
    },
    {
      path: '/four',
      name: 'Four',
      component: () => import('../views/Four.vue'),
    },
    {
      path: '/five',
      name: 'Five',
      component: () => import('../views/Five.vue'),
    },
    {
      path: '/end',
      name: 'End',
      component: () => import('../views/Ending.vue'),
    },
  ],
})

export default router
