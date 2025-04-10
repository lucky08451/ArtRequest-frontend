<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Navbar</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- 登入的導覽列 -->
        <template v-if="isLogin">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/commissions"
                >繪圖委託列表</router-link
              >
            </li>
          </ul>

          <div class="g-3 ms-auto d-flex">
            <span class="me-3" v-if="isLogin">
              使用者: <span style="color: brown">{{ userData.data.username }}</span> 角色:
              <span style="color: brown">{{ getRole }}</span>
            </span>
            <!-- 下拉選單 -->
            <div class="dropdown">
              <button
                class="btn btn-primary btn-sm dropdown-toggle"
                type="button"
                id="userMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                會員功能
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                <li>
                  <router-link class="dropdown-item" to="/my-profile">個人資料</router-link>
                </li>
                <li v-if="userData.data.role === 'artist' || userData.data.role === 'client'">
                  <router-link class="dropdown-item" to="/my-order">我的訂單</router-link>
                </li>
                <li v-if="userData.data.role === 'admin'">
                  <router-link class="dropdown-item" to="/admin/orders">訂單管理</router-link>
                </li>
                <li v-if="userData.data.role === 'artist'">
                  <router-link class="dropdown-item" to="/mycommission">我的委託</router-link>
                </li>
                <li v-if="userData.data.role === 'admin'">
                  <router-link class="dropdown-item" to="/admin/user">使用者名單</router-link>
                </li>
                <li v-if="userData.data.role === 'admin'">
                  <router-link class="dropdown-item" to="/admin/layer">表單設定</router-link>
                </li>
                <li v-if="userData.data.role === 'admin'">
                  <router-link class="dropdown-item" to="/admin/AdminPanel">後臺數據</router-link>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#" @click.prevent="logout">登出</a>
                </li>
              </ul>
            </div>
          </div>
        </template>
        <!-- 沒登入的導覽列 -->
        <template v-else>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/commissions"
                >繪圖委託列表</router-link
              >
            </li>
          </ul>

          <div class="g-3 ms-auto">
            <router-link class="btn btn-primary" active-class="active" to="/login"
              >註冊\登入</router-link
            >
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

const { logout, checkToken } = useUsersStore()
const { userData, isLogin, getRole } = storeToRefs(useUsersStore())
console.log(getRole.value)
onMounted(async () => {
  console.log('進入NAV')
  await checkToken() // 強制更新登入狀態
})

// 監聽 userData 是否變化
watch(
  () => isLogin.value,
  (newUser) => {
    // 當 user 狀態改變時執行的操作
    console.log('登入狀態:', newUser)
  },
)
</script>
