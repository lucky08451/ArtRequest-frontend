import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Admin from '@/views/admin/index.vue'
import UserEdit from '@/views/admin/components/UserEdit.vue'
import Commissions from '@/views/Commission/index.vue'
import MyCommission from '@/views/MyCommission/index.vue'
import MyCommissionList from '@/views/MyCommission/components/CommissionList.vue'
import AddCommission from '@/views/MyCommission/components/AddCommission.vue'
import EditCommission from '@/views/MyCommission/components/EditCommission.vue'
import Commission from '@/views/Commission/components/Commission.vue'
import CommissionList from '@/views/Commission/components/CommissionList.vue'
import { useUsersStore } from '@/stores/users'
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
          meta: { public: true },
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
          meta: { public: true },
        },
        {
          path: '/register',
          name: 'register',
          component: Register,
          meta: { public: true },
        },
        {
          path: '/commissions',
          name: 'commissions',
          component: Commissions,
          children: [
            {
              path: '',
              name: 'CommissionList',
              component: CommissionList,
            },
            {
              path: ':id',
              name: 'Commission',
              component: Commission,
            },
            {
              path: ':id/orderForm',
              name: 'orderForm',
              component: () => import('@/views/MyOrder/components/OrderAdd.vue'),
              meta: { requiresAuth: true, role: 'client' },
            }
          ],
        },
        {
          path: '/mycommission',
          name: 'MyCommission',
          component: MyCommission,
          meta: { requiresAuth: true, role: 'artist' },
          children: [
            {
              path: '',
              name: 'MyCommissionList',
              component: MyCommissionList,
            },
            {
              path: 'add',
              name: 'addCommission',
              component: AddCommission,
            },
            {
              path: 'edit/:id',
              name: 'editCommission',
              component: EditCommission,
            },
            {
              path: 'addForm',
              name: 'addForm',
              component: () => import('@/views/MyCommission/components/CommissionForm.vue'),
            }
          ],
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin,
          meta: { requiresAuth: true, role: 'admin' },
          children: [
            {
              path: 'user',
              name: 'adminUser',
              component: () => import('@/views/admin/components/User.vue'),
              children: [
                {
                  path: 'list',
                  name: 'adminUserList',
                  component: () => import('@/views/admin/components/UserList.vue'),
                },
                {
                  path: 'edit/:id',
                  name: 'adminUserEdit',
                  component: UserEdit,
                  props: true,
                },
              ]
            },

            {
              path: 'layer',
              name: 'layer',
              component: () => import('@/views/admin/components/Layer.vue'),
              children: [
                {
                  path: 'layer1List',
                  name: 'layer1List',
                  component: () => import('@/views/admin/components/Layer1List.vue'),
                },
                {
                  path: 'layer1Add',
                  name: 'layer1Add',
                  component: () => import('@/views/admin/components/Layer1Add.vue'),
                },
                {
                  path: 'layer1Edit/:id',
                  name: 'layer1Edit',
                  component: () => import('@/views/admin/components/Layer1Edit.vue'),
                },
                {
                  path: 'layer2List',
                  name: 'layer2List',
                  component: () => import('@/views/admin/components/Layer2List.vue'),
                },
                {
                  path: 'layer2Add',
                  name: 'layer2Add',
                  component: () => import('@/views/admin/components/Layer2Add.vue'),
                },
                {
                  path: 'layer2Edit/:id',
                  name: 'layer2Edit',
                  component: () => import('@/views/admin/components/Layer2Edit.vue'),
                },
              ]
            },
            {
              path: 'orders',
              name: 'orders',
              component: () => import('@/views/admin/components/MyOrder/OrderList.vue'),
            },
            {
              path: 'AdminPanel',
              name: 'AdminPanel',
              component: () => import('@/views/admin/components/AdminPanel/index.vue'),
            }

          ],
        },
        {
          path: '/my-profile',
          name: 'my-profile',
          component: () => import('@/views/user/profile.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/my-order',
          name: 'my-order',
          component: () => import('@/views/MyOrder/index.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'list',
              component: () => import('@/views/MyOrder/components/OrderList.vue'),
            },
          ]
        }
      ],
    },

  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUsersStore()

  // 如果是公開頁面，直接放行
  if (to.meta.public) {
    if ((to.name === 'login' || to.name === 'register') && userStore.isLogin) {
      // 重定向到首頁或其他頁面
      next({ name: 'home' });
    }
    return next()
  }
  // 檢查是否需要登入
  if (to.meta.requiresAuth) {
    if (!userStore.isLogin) {
      // 未登入，重新導向到登入頁面並記錄目標路徑
      return next({ name: 'login', query: { redirect: to.fullPath } })
    }

    // 檢查角色權限（如果有 role 要求）
    if (to.meta.role && userStore.userData.data.role !== to.meta.role) {
      // 角色不匹配，重新導向到首頁
      return next({ path: '/' })
    }
  }

  // 預設放行
  next()
})
export default router
