<template>
  <div class="container mt-5">
    <h2 class="mb-4">新增委託</h2>
    <form @submit.prevent="submitForm">
      <div class="row">
        <!-- 委託基本資料 -->
        <div class="col-md-6">
          <CommissionFormField label="標題" v-model="form.title" type="text" />
          <CommissionFormField label="委託圖片" v-model="form.photo" type="file" />
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
          {{ loading ? '提交中...' : '提交' }}
        </button>
        <button type="button" class="btn btn-secondary ms-2" @click="resetForm">重置</button>
      </div>

      <!-- 錯誤訊息 -->
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CommissionFormField from './CommissionFormField.vue'
import { addCommissionsAPI } from '@/apis/commissionsAPI'
import Swal from 'sweetalert2'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
const { userData } = storeToRefs(useUsersStore())
// 表單狀態
const form = ref({
  title: '',
  photo: null,
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

// 提交表單
const submitForm = async () => {
  loading.value = true
  error.value = null
  console.log(form.value.expiresTime)
  try {
    const formData = new FormData()
    formData.append('artistId', userData.value.data.id)
    formData.append('title', form.value.title)
    formData.append('photo', form.value.photo)
    formData.append('description', form.value.description)
    formData.append('price', form.value.price)
    formData.append('quota', form.value.quota)
    formData.append('deliveryDaysMin', form.value.deliveryDaysMin)
    formData.append('deliveryDaysMax', form.value.deliveryDaysMax)
    formData.append('expiresTime', form.value.expiresTime)
    formData.append('deliveryNote', form.value.deliveryNote)
    formData.append('authorization', form.value.authorization)
    formData.append('revisionPolicy', form.value.revisionPolicy)
    formData.append('paymentStages', form.value.paymentStages)

    const res = await addCommissionsAPI(formData)
    if (res.data.status) {
      Swal.fire({
        title: '新增成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        resetForm()
      })
    }
  } catch (err) {
    error.value = err.response?.data?.message || '新增失敗'
  } finally {
    loading.value = false
  }
}
// 重置表單
const resetForm = () => {
  form.value = {
    title: '',
    photo: null,
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
  }
}
</script>

<style scoped>
/* 可選：自定義樣式 */
</style>
