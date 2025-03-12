<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <h1 class="h3 mb-3 fw-normal">註冊帳號</h1>

        <!-- 使用者名稱 -->
        <div class="form-floating mb-2">
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': formError.username }"
            id="username"
            placeholder="輸入使用者名稱"
            required
            v-model.trim="formData.username"
            @blur="validateUsername"
          />
          <label for="username">使用者名稱</label>
          <div class="invalid-feedback">
            {{ formError.username }}
          </div>
        </div>

        <!-- Email -->
        <div class="form-floating mb-2">
          <input
            type="email"
            class="form-control"
            :class="{ 'is-invalid': formError.email }"
            id="email"
            placeholder="輸入 Email"
            required
            v-model="formData.email"
            @blur="validateEmail"
          />
          <label for="email">Email</label>
          <div class="invalid-feedback">
            {{ formError.email }}
          </div>
        </div>

        <!-- 密碼 -->
        <div class="form-floating mb-2">
          <input
            type="password"
            class="form-control"
            :class="{ 'is-invalid': formError.password }"
            id="password"
            placeholder="輸入密碼"
            required
            v-model="formData.password"
            @blur="validatePassword"
          />
          <label for="password">密碼</label>

          <div class="invalid-feedback">
            {{ formError.password }}
          </div>
        </div>

        <!-- 確認密碼 -->
        <div class="form-floating mb-2">
          <input
            type="password"
            class="form-control"
            :class="{ 'is-invalid': formError.rePassword }"
            id="rePassword"
            placeholder="確認密碼"
            required
            v-model="formData.rePassword"
            @blur="validateRePassword"
          />
          <label for="rePassword">確認密碼</label>
          <div class="invalid-feedback">{{ formError.rePassword }}</div>
        </div>

        <!-- 使用者身分選擇 -->
        <div class="form-floating mb-2">
          <select
            class="form-select"
            :class="{ 'is-invalid': formError.role }"
            id="role"
            required
            v-model="formData.role"
            @blur="validateRole"
          >
            <option value="" selected disabled>請選擇身分</option>
            <option value="client">委託人</option>
            <option value="artist">繪師</option>
          </select>
          <label for="role">選擇您的身分</label>
          <div class="invalid-feedback">
            {{ formError.role }}
          </div>
        </div>
        <!-- 註冊按鈕 -->
        <button class="btn btn-primary w-100 py-2" type="submit" @click="submitForm">註冊</button>
        <p class="mt-3 text-center">已經有帳號？<a href="/login">登入</a></p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useUsersStore } from '@/stores/users'
import Swal from 'sweetalert2'
// const isLogin = ref(false)
const { register, checkName } = useUsersStore()
const formData = ref({
  username: '',
  email: '',
  password: '',
  rePassword: '',
  role: '',
})
const formError = ref({
  username: '',
  email: '',
  password: '',
  rePassword: '',
  role: '',
})

const validateUsername = async () => {
  const res = await checkName({ username: formData.value.username })
  console.log(res)

  if (!res.status) {
    formError.value.username = res.message
    return
  }
  const usernamePattern = /^[A-Za-z0-9._-]+$/
  if (formData.value.username === '') {
    formError.value.username = '請輸入帳號'
  } else if (
    formData.value.username.length < 6 ||
    formData.value.username.length > 12 ||
    !usernamePattern.test(formData.value.username)
  ) {
    formError.value.username = '帳號只能包含英文字母、數字、._-，且超過 6 個字'
  } else {
    formError.value.username = ''
  }
}
const validatePassword = () => {
  if (formData.value.password === '') {
    formError.value.password = '請輸入密碼'
  } else if (formData.value.password.length < 6 || formData.value.password.length > 12) {
    formError.value.password = '密碼長度需在 3-10 個字元之間'
  } else {
    formError.value.password = ''
  }
}
const validateRePassword = () => {
  if (formData.value.rePassword === '') {
    formError.value.rePassword = '請輸入確認密碼'
  } else if (formData.value.rePassword !== formData.value.password) {
    formError.value.rePassword = '密碼不一致'
  } else {
    formError.value.rePassword = ''
  }
}
const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (formData.value.email === '') {
    formError.value.email = '請輸入 Email'
  } else if (!emailPattern.test(formData.value.email)) {
    formError.value.email = '請輸入有效的電子郵件'
  } else {
    formError.value.email = ''
  }
}
const validateRole = () => {
  if (formData.value.role === '') {
    formError.value.role = '請選擇身分'
  } else if (!['artist', 'client'].includes(formData.value.role)) {
    formError.value.role = '請選擇有效的角色'
  } else {
    formError.value.role = ''
  }
}
const isFormValid = computed(() => {
  return (
    Object.values(formError.value).every((field) => field === '') &&
    Object.values(formData.value).every((field) => field !== '')
  )
})
/* const validateField = (field) => {
  const value = formData.value[field]
  let isValid = false
  let msg = ''
  switch (field) {
    case 'username': {
      const usernamePattern = /^[A-Za-z0-9._-]+$/
      isValid = usernamePattern.test(value) && value.length <= 255 && value.length >= 6
      msg = isValid ? '帳號格式正確' : '帳號只能包含英文字母、數字、._-，且超過 6 個字'
      break
    }
    case 'email': {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      isValid = emailPattern.test(value) && value.length <= 255
      msg = isValid ? '電子郵件格式正確' : '請輸入有效的電子郵件 (不超過 255 字)'
      break
    }
    case 'password':
      isValid = value.length >= 6
      msg = isValid ? '密碼符合規定' : '密碼至少需要 6 個字元'
      break
    case 'rePassword':
      isValid = value === formData.value.password
      msg = isValid ? '密碼一致' : '密碼不一致'
      break
    case 'role':
      isValid = ['artist', 'client'].includes(value)
      msg = isValid ? '角色選擇正確' : '請選擇有效的角色'
      break
  }
  validation.value[field].isValid = isValid
  validation.value[field].msg = msg
} */
const submitForm = async () => {
  validateUsername()
  validateEmail()
  validatePassword()
  validateRePassword()
  validateRole()
  if (!isFormValid.value) {
    Swal.fire({
      title: '請確認所有欄位',
      icon: 'info',
      draggable: true,
    }).then(() => {
      return
    })
  }
  let JSONdata = {}
  JSONdata['username'] = formData.value.username
  JSONdata['email'] = formData.value.email
  JSONdata['password'] = formData.value.password
  JSONdata['role'] = formData.value.role
  const res = await register(JSONdata)
  if (res.status) {
    Swal.fire({
      title: res.message,
      icon: 'success',
      draggable: true,
    }).then(() => {
      window.location.href = '/login'
    })
  } else {
    Swal.fire({
      title: res.message,
      icon: 'info',
      draggable: true,
    })
  }
}
</script>

<style scoped></style>
