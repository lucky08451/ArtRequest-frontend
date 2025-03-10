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
            :class="{ 'is-invalid': usernameError }"
            v-model.trim="userInfo.username"
            @blur="validateUsername"
          />
          <label for="floatingUserName"> Username </label>
          <div class="invalid-feedback">{{ usernameError }}</div>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            :class="{ 'is-invalid': passwordError }"
            id="floatingPassword"
            placeholder="123"
            v-model.trim="userInfo.password"
            @blur="validatePassword"
          />
          <label for="floatingPassword"> Password </label>
          <div class="invalid-feedback">{{ passwordError }}</div>
        </div>

        <div class="form-check text-start my-3">
          <input
            class="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault"> 記住帳號 </label>
        </div>
        <div class="row">
          <div class="col-6">
            <button class="btn btn-primary w-100 py-2" type="submit" @click="submitForm">
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
import { computed, ref } from 'vue'
import { useUsersStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
const { userData } = storeToRefs(useUsersStore())
const { login } = useUsersStore()

const userInfo = ref({
  username: '',
  password: '',
})
// 錯誤訊息
const usernameError = ref('')
const passwordError = ref('')
// 表單驗證
const validateUsername = () => {
  if (userInfo.value.username === '') {
    usernameError.value = '請輸入帳號'
  } else if (userInfo.value.username.length < 3 || userInfo.value.username.length > 10) {
    usernameError.value = '帳號長度需在 3-10 個字元之間'
  } else {
    usernameError.value = ''
  }
}
const validatePassword = () => {
  if (userInfo.value.password === '') {
    passwordError.value = '請輸入密碼'
  } else if (userInfo.value.password.length < 3 || userInfo.value.password.length > 10) {
    passwordError.value = '密碼長度需在 3-10 個字元之間'
  } else {
    passwordError.value = ''
  }
}
// 表單是否有效
const isFormValid = computed(() => {
  return (
    !usernameError.value &&
    !passwordError.value &&
    userInfo.value.username &&
    userInfo.value.password
  )
})
const submitForm = async () => {
  validateUsername()
  validatePassword()
  if (!isFormValid.value) {
    return
  }
  await login({ username: userInfo.value.username, password: userInfo.value.password })
  console.log(userData.value)
}
</script>

<style scoped></style>
