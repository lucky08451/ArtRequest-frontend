<template>
  <div class="card">
    <div class="card-header">修改委託</div>
    <div class="card-body">
      <form @submit.prevent="submitForm" v-if="form">
        <CommissionFormField label="標題" v-model="form.title" type="text" :error="errors.title" />
        <CommissionFormField
          label="委託圖片"
          v-model="form.photo"
          type="file"
          :error="errors.photo"
          :required="false"
        />
        <div v-if="form?.photo" class="mb-3">
          <label>現有圖片</label>
          <img
            :src="`${imgURL}/commissions/${form.photo}`"
            alt="現有圖片"
            style="max-width: 200px"
          />
        </div>
        <CommissionFormField
          label="描述"
          v-model="form.description"
          type="textarea"
          :required="true"
          :error="errors.description"
        />
        <CommissionFormField
          label="價格"
          v-model="form.price"
          type="number"
          :required="true"
          :error="errors.price"
        />
        <CommissionFormField
          label="名額 (0 表示不設限)"
          v-model="form.quota"
          type="number"
          :required="true"
          :error="errors.quota"
        />
        <CommissionFormField
          label="最短交付天數"
          v-model="form.deliveryDaysMin"
          type="number"
          :required="true"
          :error="errors.deliveryDaysMin"
        />
        <CommissionFormField
          label="最長交付天數"
          v-model="form.deliveryDaysMax"
          type="number"
          :required="true"
          :error="errors.deliveryDaysMax"
        />
        <CommissionFormField
          label="到期時間"
          v-model="formattedExpiresTime"
          type="date"
          :required="true"
          :error="errors.expiresTime"
        />
        <CommissionFormField
          label="交付備註"
          v-model="form.detail.deliveryNote"
          type="textarea"
          :required="true"
          :error="errors.deliveryNote"
        />
        <CommissionFormField
          label="授權"
          v-model="form.detail.authorization"
          type="text"
          :required="true"
          :error="errors.authorization"
        />
        <CommissionFormField
          label="修改政策"
          v-model="form.detail.revisionPolicy"
          type="text"
          :required="true"
          :error="errors.revisionPolicy"
        />
        <CommissionFormField
          label="付款階段"
          v-model="form.detail.paymentStages"
          type="text"
          :required="true"
          :error="errors.paymentStages"
        />
        <button type="submit" class="btn btn-primary" :disabled="loading || hasErrors">
          {{ loading ? '保存中...' : '保存' }}
        </button>
        <router-link to="/mycommission" class="btn btn-secondary ms-2">取消</router-link>
      </form>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import CommissionFormField from './CommissionFormField.vue'
import { useCommissionsStore } from '@/stores/commissions'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'
const imgURL = import.meta.env.VITE_IMAGE_URL

const usersStore = useUsersStore()
const { userData } = storeToRefs(usersStore)

const router = useRouter()
const commissionsStore = useCommissionsStore()
const { updateCommission } = commissionsStore
const { getCurrentCommission } = storeToRefs(commissionsStore)

const form = ref(null)
const loading = ref(false)
const error = ref(null)
const errors = ref({})

// 初始化表單資料
onMounted(() => {
  const current = getCurrentCommission.value // 直接從 store 取 currentCommission
  if (current) {
    form.value = {
      ...current,
      expiresTime: current.expiresTime.split(' ')[0], // 格式化日期
    }
  } else {
    console.warn('沒有當前委託資料')
  }
})

// 格式化 expiresTime 的計算屬性，與 v-model 雙向綁定
const formattedExpiresTime = computed({
  get: () => form.value?.expiresTime || '',
  set: (value) => {
    if (form.value) {
      form.value.expiresTime = value // 更新 form 中的值
    }
  },
})

// 檢查是否有錯誤
const hasErrors = computed(() => Object.keys(errors.value).length > 0)

// 提交表單
const submitForm = async () => {
  loading.value = true
  error.value = null
  errors.value = {}
  const formData = new FormData()
  formData.append('artistId', userData.value.data.id)
  formData.append('title', form.value.title)
  // 判斷有沒有上傳圖片
  if (form.value.photo && form.value.photo instanceof File) {
    formData.append('photo', form.value.photo)
  }
  formData.append('description', form.value.description)
  formData.append('price', form.value.price || '')
  formData.append('quota', form.value.quota || '')
  formData.append('deliveryDaysMin', form.value.deliveryDaysMin)
  formData.append('deliveryDaysMax', form.value.deliveryDaysMax)
  formData.append('expiresTime', form.value.expiresTime)
  formData.append('deliveryNote', form.value.detail.deliveryNote)
  formData.append('authorization', form.value.detail.authorization)
  formData.append('revisionPolicy', form.value.detail.revisionPolicy)
  formData.append('paymentStages', form.value.detail.paymentStages)
  try {
    // 透過路由獲取id
    const res = await updateCommission(form.value.id, formData)
    if (res.status) {
      router.push('/mycommission') // 成功後跳轉
    } else {
      error.value = res.data.message || '更新失敗'
    }
  } catch (err) {
    error.value = err.message || '請求失敗'
  } finally {
    loading.value = false
  }
}
</script>
