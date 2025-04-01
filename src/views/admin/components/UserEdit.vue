<template>
  <div class="container mt-4">
    <h2>編輯用戶</h2>
    <div v-if="!userData">載入中...</div>
    <div v-else>
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
          <input type="password" class="form-control" v-model="userData.password" required />
        </div>
        <div class="mb-3">
          <label class="form-label">角色</label>
          <select class="form-select" v-model="userData.role">
            <option value="admin">管理員</option>
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
  </div>
</template>
<script setup>
// import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { storeToRefs } from 'pinia'

import { useUsersStore } from '@/stores/users'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  id: {
    type: String,
    required: true,
  },
})

const route = useRoute()
const { userListData } = storeToRefs(useUsersStore())
const { update } = useUsersStore()
console.log(userListData.value)
console.log(route.params.id)

const userData = ref(null)
const avatarInput = ref(null)
userListData.value.forEach((item) => {
  if (item.id == route.params.id) {
    userData.value = item
  }
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
  const file = avatarInput.value.files[0] // 正確引用 avatarInput

  const form = new FormData()
  if (file) {
    form.append('avatar', file) // 上傳檔案
  }
  form.append('id', userData.value.id) // 上傳檔案
  form.append('email', userData.value.email)
  form.append('password', userData.value.password)
  form.append('role', userData.value.role)
  form.append('bio', userData.value.bio || '') // 避免 bio 為空

  try {
    const res = await update(route.params.id, form)
    console.log('回應:', res)
    Swal.fire({
      title: '更新成功',
      icon: 'success',
      confirmButtonText: '確認',
    }).then(() => {
      route.to('../')
    })
  } catch (error) {
    console.error('錯誤:', error.response?.data || error.message)
    Swal.fire({
      title: '更新失敗',
      text: error.response?.data?.message || '未知錯誤',
      icon: 'error',
      confirmButtonText: '確認',
    })
  }
}
</script>

<style scoped></style>
