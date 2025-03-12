<template>
  <div class="container mt-4">
    <h2>編輯用戶</h2>
    <div v-if="isLoading">載入中...</div>
    <div v-else>
      <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>
      <form @submit.prevent="updateUser">
        <div class="mb-3">
          <label class="form-label">帳號</label>
          <input type="text" class="form-control" v-model="userData.username" required />
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
          <label for="formFile" class="form-label">頭像</label>
          <input class="form-control" type="file" id="avatar" @change="uploadFile" name="avatar" />
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userIdAPI } from '@/apis/userAPI'
import Swal from 'sweetalert2'
const route = useRoute()
const router = useRouter()
const userData = ref({ username: '', email: '', password: '', role: '', bio: '', avatar: '' })
const isLoading = ref(true)
const errorMsg = ref('')
const fetchUserData = async () => {
  const userId = route.params.id
  const res = await userIdAPI(userId)
  if (res.data.status) {
    userData.value = res.data.data
    isLoading.value = false
  } else {
    errorMsg.value = res.data.message
  }
  console.log(res)
}
onMounted(() => {
  fetchUserData()
})
const uploadFile = () => {
  const file = avatar.files[0]
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  console.log(URL.createObjectURL(file))
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
  }).then(() => {})
  // const form = new FormData()
  // form.append('file', file)
  // form.append('id', userData.value.id)
  // console.log(form)
}
</script>

<style scoped></style>
