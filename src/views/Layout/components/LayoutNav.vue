<template>
  <div class="container">
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
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/todos"
                >Todos</router-link
              >
            </li>
            <li class="nav-item" v-if="isLogin">
              <router-link class="nav-link" active-class="active" to="/users"
                >使用者名單</router-link
              >
            </li>
          </ul>

          <div class="g-3 ms-auto">
            <span class="me-3" v-if="isLogin">
              使用者: <span style="color: brown">{{ userData.username }}</span>
            </span>
            <router-link
              v-if="!isLogin"
              class="btn btn-primary"
              active-class="active"
              to="/login"
              >註冊\登入</router-link
            >
            <a
              class="btn btn-primary btn-sm"
              href="#"
              role="button"
              v-else
              @click="logout"
              >登出</a
            >
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import axios from "axios"
import { onMounted, ref } from "vue"
const isLogin = ref(false)
const userData = ref({})
onMounted(() => {
  getMe()
})
const getMe = () => {
  axios
    .get("/api/auth/me", { withCredentials: true })
    .then((res) => {
      console.log(res)
      if (res.data.status === true) {
        userData.value = res.data.data
        isLogin.value = true
      } else {
        isLogin.value = false
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
const logout = () => {
  axios
    .get("/api/auth/logout", { withCredentials: true })
    .then((res) => {
      console.log(res)
      if (res.data.status === true) {
        window.Swal.fire({
          title: "登出成功",
          icon: "success",
        }).then(() => {
          isLogin.value = false
          userData.value = {}
          location.reload()
        })
      } else {
        window.Swal.fire({
          title: res.data.message,
          icon: "error",
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
