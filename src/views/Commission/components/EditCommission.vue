<template>
  <div class="container mt-5">
    <h2 class="mb-4">編輯委託</h2>
    <form @submit.prevent="submitForm">
      <div class="row">
        <!-- 委託基本資料 -->
        <div class="col-md-6">
          <CommissionFormField label="標題" v-model="form.title" type="text" />
          <CommissionFormField label="委託圖片" v-model="form.photo" type="file" />
          <div v-if="existingPhoto" class="mb-3">
            <label class="form-label">現有圖片</label>
            <img :src="existingPhoto" alt="現有委託圖片" style="max-width: 200px; height: auto" />
          </div>
          <CommissionFormField label="描述" v-model="form.description" type="textarea" />
          <CommissionFormField label="價格" v-model="form.price" type="number" />
          <CommissionFormField label="名額" v-model="form.quota" type="number" />
          <CommissionFormField label="最短交付天數" v-model="form.deliveryDaysMin" type="number" />
          <CommissionFormField label="最長交付天數" v-model="form.deliveryDaysMax" type="number" />
          <CommissionFormField label="到期時間" v-model="form.expiresTime" type="date" />
        </div>
        <!-- 委託詳細資料 -->
        <div class="col-md-6">
          <CommissionFormField label="交付備註" v-model="form.deliveryNote" type="textarea" />
          <CommissionFormField label="授權" v-model="form.authorization" type="text" />
          <CommissionFormField label="修改政策" v-model="form.revisionPolicy" type="text" />
          <CommissionFormField label="付款階段" v-model="form.paymentStages" type="text" />
        </div>
      </div>

      <!-- 提交按鈕 -->
      <div class="mt-4">
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? '保存中...' : '保存' }}
        </button>
        <button type="button" class="btn btn-secondary ms-2" @click="resetForm">重置</button>
        <router-link to="/commissions" class="btn btn-outline-secondary ms-2">返回</router-link>
      </div>

      <!-- 錯誤訊息 -->
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CommissionFormField from './CommissionFormField.vue'
import { getCommissionAPI, updateCommissionAPI } from '@/apis/commissionsAPI' // 假設的 API
import Swal from 'sweetalert2'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

const { userData } = storeToRefs(useUsersStore())
const route = useRoute()
const router = useRouter()

// 表單狀態
const form = ref({
  title: '',
  photo: null, // 新上傳的圖片
  description: '',
  price: '',
  quota: '',
  deliveryDaysMin: '',
  deliveryDaysMax: '',
  expiresTime: '',
  deliveryNote: '',
  authorization: '',
  revisionPolicy: '',
  paymentStages: '',
})

// 其他狀態
const loading = ref(false)
const error = ref(null)
const existingPhoto = ref('') // 儲存現有圖片 URL

// 獲取委託資料
const fetchCommission = async () => {
  loading.value = true
  try {
    const commissionId = route.params.id // 從路由參數獲取 ID
    const res = await getCommissionAPI(commissionId)
    if (res.data.status) {
      const commission = res.data.data
      form.value = {
        title: commission.title || '',
        photo: null, // 不預設檔案，因為檔案需要重新上傳
        description: commission.description || '',
        price: commission.price || '',
        quota: commission.quota || '',
        deliveryDaysMin: commission.delivery_days_min || '',
        deliveryDaysMax: commission.delivery_days_max || '',
        expiresTime: commission.expires_time ? commission.expires_time.split(' ')[0] : '', // 只取日期部分
        deliveryNote: commission.delivery_note || '',
        authorization: commission.authorization || '',
        revisionPolicy: commission.revision_policy || '',
        paymentStages: commission.payment_stages || '',
      }
      existingPhoto.value = commission.photo ? `/img/${commission.photo}` : '' // 假設圖片路徑
    } else {
      throw new Error('無法獲取委託資料')
    }
  } catch (err) {
    error.value = err.response?.data?.message || '載入資料失敗'
  } finally {
    loading.value = false
  }
}

// 提交表單
const submitForm = async () => {
  loading.value = true
  error.value = null

  try {
    const formData = new FormData()
    formData.append('artistId', userData.value.data.id)
    formData.append('title', form.value.title)
    if (form.value.photo) formData.append('photo', form.value.photo) // 只在有新圖片時上傳
    formData.append('description', form.value.description || '')
    formData.append('price', form.value.price || '')
    formData.append('quota', form.value.quota || '')
    formData.append('deliveryDaysMin', form.value.deliveryDaysMin || '')
    formData.append('deliveryDaysMax', form.value.deliveryDaysMax || '')
    formData.append('expiresTime', form.value.expiresTime)
    formData.append('deliveryNote', form.value.deliveryNote || '')
    formData.append('authorization', form.value.authorization || '')
    formData.append('revisionPolicy', form.value.revisionPolicy || '')
    formData.append('paymentStages', form.value.paymentStages || '')
    formData.append('_method', 'PUT') // 如果後端使用 POST 模擬 PUT

    const commissionId = route.params.id
    const res = await updateCommissionAPI(commissionId, formData)
    if (res.data.status) {
      Swal.fire({
        title: '更新成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.push('/commissions') // 返回委託列表
      })
    }
  } catch (err) {
    error.value = err.response?.data?.message || '更新失敗'
  } finally {
    loading.value = false
  }
}

// 重置表單（恢復初始載入的資料）
const resetForm = () => {
  fetchCommission()
}

// 初始化時載入資料
onMounted(() => {
  fetchCommission()
})
</script>

<style scoped>
/* 可選：自定義樣式 */
</style>
