<template>
  <div class="card">
    <div class="card-header">新增委託</div>
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <CommissionFormField label="標題" v-model="form.title" type="text" :error="errors.title" />
        <CommissionFormField
          label="委託圖片"
          v-model="form.photo"
          type="file"
          :required="true"
          :error="errors.photo"
          @change="console.log(form.photo)"
        />
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
          v-model="form.expiresTime"
          type="date"
          :required="true"
          :error="errors.expiresTime"
        />
        <CommissionFormField
          label="交付備註"
          v-model="form.deliveryNote"
          type="textarea"
          :required="true"
          :error="errors.deliveryNote"
        />
        <CommissionFormField
          label="授權"
          v-model="form.authorization"
          type="text"
          :required="true"
          :error="errors.authorization"
        />
        <CommissionFormField
          label="修改政策"
          v-model="form.revisionPolicy"
          type="text"
          :required="true"
          :error="errors.revisionPolicy"
        />
        <CommissionFormField
          label="付款階段"
          v-model="form.paymentStages"
          type="text"
          :required="true"
          :error="errors.paymentStages"
        />
        <button type="submit" class="btn btn-primary" :disabled="loading || hasErrors">
          {{ loading ? '提交中...' : '新增' }}
        </button>
        <router-link to="/mycommission" class="btn btn-secondary ms-2">取消</router-link>
      </form>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import CommissionFormField from './CommissionFormField.vue'
import { useCommissionsStore } from '@/stores/commissions'
import { useUsersStore } from '@/stores/users'
import Swal from 'sweetalert2'
import { storeToRefs } from 'pinia'

const router = useRouter()
const commissionsStore = useCommissionsStore()
const { addCommission } = commissionsStore
const usersStore = useUsersStore()
const { userData } = storeToRefs(usersStore)

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
const loading = ref(false)
const error = ref(null)
const errors = ref({})

const validateForm = () => {
  errors.value = {}
  if (!form.value.title) errors.value.title = '標題為必填項'
  if (!form.value.photo) errors.value.photo = '請上傳委託圖片'
  if (form.value.quota !== '' && (isNaN(form.value.quota) || form.value.quota < 0))
    errors.value.quota = '名額必須為 0 或正整數'
  if (!form.value.deliveryDaysMin || form.value.deliveryDaysMin < 1)
    errors.value.deliveryDaysMin = '最短交付天數為必填且必須大於 0'
  if (!form.value.deliveryDaysMax || form.value.deliveryDaysMax < form.value.deliveryDaysMin)
    errors.value.deliveryDaysMax = '最長交付天數必須大於最短天數'
  if (!form.value.expiresTime) errors.value.expiresTime = '到期時間為必填項'
  if (!form.value.deliveryNote) errors.value.deliveryNote = '交付備註為必填項'
  if (!form.value.authorization) errors.value.authorization = '授權為必填項'
  if (!form.value.revisionPolicy) errors.value.revisionPolicy = '修改政策為必填項'
  if (!form.value.paymentStages) errors.value.paymentStages = '付款階段為必填項'
  return Object.keys(errors.value).length === 0
}

const hasErrors = computed(() => Object.keys(errors.value).length > 0)

const submitForm = async () => {
  console.log(form.value)

  if (!validateForm()) return

  loading.value = true
  error.value = null

  try {
    const formData = new FormData()
    formData.append('artistId', userData.value.data.id)
    formData.append('title', form.value.title)
    formData.append('photo', form.value.photo)
    formData.append('description', form.value.description)
    formData.append('price', form.value.price || '')
    formData.append('quota', form.value.quota || '')
    formData.append('deliveryDaysMin', form.value.deliveryDaysMin)
    formData.append('deliveryDaysMax', form.value.deliveryDaysMax)
    formData.append('expiresTime', form.value.expiresTime)
    formData.append('deliveryNote', form.value.deliveryNote)
    formData.append('authorization', form.value.authorization)
    formData.append('revisionPolicy', form.value.revisionPolicy)
    formData.append('paymentStages', form.value.paymentStages)
    const res = await addCommission(formData)
    console.log(res)

    if (res.status) {
      Swal.fire('新增成功', '', 'success')
      // router.push('/mycommission')
    }
  } catch (err) {
    error.value = err.response?.data?.message || '新增失敗'
    console.log(err)
  } finally {
    loading.value = false
  }
}
</script>
