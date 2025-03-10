<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <p id="isLogin"></p>
      </div>
    </div>
    <div class="row justify-content-center mt-5">
      <div class="col-6">
        <h1 class="h3 mb-3 fw-normal">登入</h1>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="floatingUserName"
            placeholder="owner"
            v-model="username"
          />
          <label for="floatingUserName"> UserName </label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="123"
            v-model="password"
          />
          <label for="floatingPassword"> Password </label>
        </div>

        <div class="form-check text-start my-3">
          <input
            class="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            記住帳號
          </label>
        </div>
        <div class="row">
          <div class="col-6">
            <button
              class="btn btn-primary w-100 py-2"
              type="submit"
              @click="btnLogin"
            >
              登入
            </button>
          </div>
          <div class="col-6">
            <a class="btn btn-success w-100 py-2" href="/register"> 註冊 </a>
          </div>
        </div>

        <p class="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import axios from "axios"
// const isLogin = ref(false)
const username = ref("")
const password = ref("")
const btnLogin = async () => {
  await axios
    .post(
      "/api/auth/login",
      {
        username: username.value,
        password: password.value,
      },
      { withCredentials: true }
    )
    .then((res) => {
      if (res.status === 200) {
        window.Swal.fire({
          title: res.data.message,
          icon: "success",
          draggable: true,
        }).then(() => {
          username.value = ""
          password.value = ""
          location.href = "/"
        })
      } else {
        window.Swal.fire({
          title: res.data.message,
          icon: "error",
          draggable: true,
        })
      }
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
      window.Swal.fire({
        title: "登入失敗",
        icon: "error",
        draggable: true,
      })
    })
}
</script>

<style scoped></style>
