import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Todos from '@/views/Todos.vue'
import Admin from '@/views/admin/index.vue'
import UserList from '@/views/admin/components/UserList.vue'
import UserEdit from '@/views/admin/components/UserEdit.vue'
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
        },
      ],
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: '',
          name: 'list',
          component: UserList,
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: UserEdit,
        },
      ],
    }

  ],
})

export default router
