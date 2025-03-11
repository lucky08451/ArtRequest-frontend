import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Todos from '@/views/Todos.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: "",
          name: "home",
          component: Home,
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
        },
        {
          path: '/register',
          name: 'register',
          component: Register,
        },
        {
          path: '/todos',
          name: 'todos',
          component: Todos,
        }
      ],
    },

  ],
})

export default router
