<template>
  <h1>個人資料頁面</h1>
  <div v-if="userData">
    <form @submit.prevent="updateUser">
      <input type="hidden" name="id" v-model="userData.id" />
      <div class="mb-3">
        <label class="form-label">帳號</label>
        <input type="text" class="form-control" v-model="userData.username" disabled />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" v-model="userData.email" required />
      </div>
      <div class="mb-3">
        <label class="form-label">密碼</label>
        <input type="password" class="form-control" v-model="userData.password" />
      </div>
      <div class="mb-3">
        <label class="form-label">角色</label>
        <select class="form-select" v-model="userData.role" disabled>
          <option value="client">委託人</option>
          <option value="artist">繪師</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">
          預覽頭像
          <img
            :src="`/img/avatars/${userData.avatar}`"
            style="height: 100px"
            class="ms-2"
            id="avatarPreview"
          />
        </label>
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label">頭像</label>
        <input
          class="form-control"
          type="file"
          ref="avatarInput"
          id="avatar"
          @change="checkFile"
          name="avatar"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">個人簡介</label>
        <textarea class="form-control" v-model="userData.bio"></textarea>
      </div>
      <button type="submit" class="btn btn-success">更新</button>
      <router-link to="../" class="btn btn-secondary ms-2">取消</router-link>
    </form>
  </div>
</template>
<script setup>
import { useUsersStore } from '@/stores/users'
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router' // 引入 useRouter
const { getUserData, update } = useUsersStore()
const router = useRouter()
const userData = ref(null)
const avatarInput = ref(null)
onMounted(async () => {
  const res = await getUserData()
  console.log(res)
  userData.value = res
})
const checkFile = async () => {
  const file = avatarInput.value.files[0]
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  console.log(URL.createObjectURL(file))
  console.log(file)

  if (!allowedTypes.includes(file.type)) {
    Swal.fire({
      title: `檔案格式錯誤`,
      confirmButtonText: '確認',
      icon: 'error',
    })
    return
  }
  Swal.fire({
    title: `檔案格式正確`,
    html: `<img src="${URL.createObjectURL(file)}" style="height: 100px" />`,
    icon: 'success',
    confirmButtonText: '確認',
  })
  // userData.value.avatar = file
  // const form = new FormData()
  // form.append('file', file)
  // form.append('id', userData.value.id)
  // console.log(form)
  // 將檔案存到 userData 用於預覽，但後端仍需從 FormData 獲取
  // 設定img 的 src 屬性為 URL.createObjectURL(file)，用於前端顯示
  document.getElementById('avatarPreview').src = URL.createObjectURL(file)
}
const updateUser = async () => {
  console.log(userData.value)
  const formData = new FormData()
  formData.append('id', userData.value.id)
  formData.append('email', userData.value.email)
  if (userData.value.password) {
    formData.append('password', userData.value.password)
  }
  formData.append('role', userData.value.role)
  const file = avatarInput.value.files[0]
  if (file) {
    formData.append('avatar', file)
  }
  formData.append('bio', userData.value.bio)
  const res = await update(userData.value.id, formData)
  if (res) {
    Swal.fire({
      title: '更新成功',
      icon: 'success',
      confirmButtonText: '確認',
    }).then(() => {
      // 跳轉到首頁
      router.push({ name: 'home' })
    })
  }
}
</script>
