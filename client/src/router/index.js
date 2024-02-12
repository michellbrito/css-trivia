import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/trivias',
      name: 'trivias',
      component: () => import('../views/Trivias.vue')
    },
    {
      path: '/trivia/:id',
      name: 'trivia',
      component: () => import('../views/Trivia.vue')
    }
  ]
})

export default router
