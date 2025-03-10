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
              <router-link class="nav-link" active-class="active" to="/todos">Todos</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/users"
                >使用者名單</router-link
              >
            </li>
          </ul>

          <div class="g-3 ms-auto">
            <span class="me-3" v-if="isLogin">
              使用者: <span style="color: brown">{{ userData.username }}</span>
            </span>

            <a class="btn btn-primary btn-sm" href="#" role="button" @click="logout">登出</a>
          </div>
        </template>
        <!-- 沒登入的導覽列 -->
        <template v-else>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/todos">Todos</router-link>
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
import { ref } from 'vue'
const isLogin = ref(false)
const userData = ref({})
</script>
