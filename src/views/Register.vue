<template>
  <div class="container">
    <div class="row align-items-center justify-content-center vh-100">
      <div class="col-md-6">
        <h1 class="h3 mb-3 fw-normal">註冊帳號</h1>

        <!-- 使用者名稱 -->
        <div class="form-floating mb-2">
          <input
            type="text"
            class="form-control"
            :class="{
              'is-invalid': !validation.username.isValid,
              'is-valid': validation.username.isValid,
            }"
            id="username"
            placeholder="輸入使用者名稱"
            required
            v-model="formData.username"
            @change="validateField('username')"
          />
          <label for="username">使用者名稱</label>
          <div class="valid-feedback">{{ validation.username.msg }}</div>
          <div class="invalid-feedback">
            {{ validation.username.msg }}
          </div>
        </div>

        <!-- Email -->
        <div class="form-floating mb-2">
          <input
            type="email"
            class="form-control"
            :class="{
              'is-invalid': !validation.email.isValid,
              'is-valid': validation.email.isValid,
            }"
            id="email"
            placeholder="輸入 Email"
            required
            v-model="formData.email"
            @change="validateField('email')"
          />
          <label for="email">Email</label>
          <div class="valid-feedback">{{ validation.email.msg }}</div>
          <div class="invalid-feedback">
            {{ validation.email.msg }}
          </div>
        </div>

        <!-- 密碼 -->
        <div class="form-floating mb-2">
          <input
            type="password"
            class="form-control"
            :class="{
              'is-invalid': !validation.password.isValid,
              'is-valid': validation.password.isValid,
            }"
            id="password"
            placeholder="輸入密碼"
            required
            v-model="formData.password"
            @change="validateField('password')"
          />
          <label for="password">密碼</label>
          <div class="valid-feedback">{{ validation.password.msg }}</div>
          <div class="invalid-feedback">
            {{ validation.password.msg }}
          </div>
        </div>

        <!-- 確認密碼 -->
        <div class="form-floating mb-2">
          <input
            type="password"
            class="form-control"
            :class="{
              'is-invalid': !validation.rePassword.isValid,
              'is-valid': validation.rePassword.isValid,
            }"
            id="rePassword"
            placeholder="確認密碼"
            required
            v-model="formData.rePassword"
            @change="validateField('rePassword')"
          />
          <label for="rePassword">確認密碼</label>
          <div class="valid-feedback">{{ validation.role.msg }}</div>
          <div class="invalid-feedback">{{ validation.role.msg }}</div>
        </div>

        <!-- 使用者身分選擇 -->
        <div class="form-floating mb-2">
          <select
            class="form-select"
            :class="{
              'is-invalid': !validation.role.isValid,
              'is-valid': validation.role.isValid,
            }"
            id="role"
            required
            v-model="formData.role"
            @change="validateField('role')"
          >
            <option value="" selected disabled>請選擇身分</option>
            <option value="client">委託人</option>
            <option value="artist">繪師</option>
          </select>
          <label for="role">選擇您的身分</label>
          <div class="valid-feedback">
            {{ validation.role.msg }}
          </div>
          <div class="invalid-feedback">
            {{ validation.role.msg }}
          </div>
        </div>
        <!-- 註冊按鈕 -->
        <button
          class="btn btn-primary w-100 py-2"
          type="submit"
          @click="btnReg"
        >
          註冊
        </button>
        <p class="mt-3 text-center">已經有帳號？<a href="/login">登入</a></p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import axios from "axios"
// const isLogin = ref(false)
const formData = ref({
  username: "",
  email: "",
  password: "",
  rePassword: "",
  role: "",
})

const validation = ref({
  username: { isValid: false, msg: "" },
  email: { isValid: false, msg: "" },
  password: { isValid: false, msg: "" },
  rePassword: { isValid: false, msg: "" },
  role: { isValid: false, msg: "" },
})

const validateField = (field) => {
  const value = formData.value[field]
  let isValid = false
  let msg = ""
  switch (field) {
    case "username": {
      const usernamePattern = /^[A-Za-z0-9._-]+$/
      isValid =
        usernamePattern.test(value) && value.length <= 255 && value.length >= 6
      msg = isValid
        ? "帳號格式正確"
        : "帳號只能包含英文字母、數字、._-，且超過 6 個字"
      break
    }
    case "email": {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      isValid = emailPattern.test(value) && value.length <= 255
      msg = isValid
        ? "電子郵件格式正確"
        : "請輸入有效的電子郵件 (不超過 255 字)"
      break
    }
    case "password":
      isValid = value.length >= 6
      msg = isValid ? "密碼符合規定" : "密碼至少需要 6 個字元"
      break
    case "rePassword":
      isValid = value === formData.value.password
      msg = isValid ? "密碼一致" : "密碼不一致"
      break
    case "role":
      isValid = ["artist", "client"].includes(value)
      msg = isValid ? "角色選擇正確" : "請選擇有效的角色"
      break
  }
  validation.value[field].isValid = isValid
  validation.value[field].msg = msg
}
const btnReg = () => {
  if (
    !Object.values(validation.value).every((field) => field.isValid === true)
  ) {
    window.Swal.fire({
      title: "請確認所有欄位",
      icon: "info",
      draggable: true,
    })
    return
  }
  let JSONdata = {}
  JSONdata["username"] = formData.value.username
  JSONdata["email"] = formData.value.email
  JSONdata["password"] = formData.value.password
  JSONdata["role"] = formData.value.role
  axios
    .post("http://localhost:8000/api/auth/register", JSONdata)
    .then((res) => {
      const { data } = res
      if (data.status === true) {
        window.Swal.fire({
          title: data.message,
          icon: "success",
          draggable: true,
        })
      } else {
        window.Swal.fire({
          title: data.message,
          icon: "info",
          draggable: true,
        })
      }
    })
    .catch((err) => {
      window.Swal.fire({
        title: "連線失敗",
        text: err,
        icon: "error",
        draggable: true,
      })
    })
}
</script>

<style scoped></style>
