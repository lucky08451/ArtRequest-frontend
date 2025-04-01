<!-- views/CommissionDetail.vue -->
<template>
  <div class="container mt-4">
    <!-- 載入中提示 -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">載入中...</span>
      </div>
      <p class="mt-2">載入中...</p>
    </div>

    <!-- 錯誤訊息 -->
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- 委託詳情 -->
    <div v-if="commissionsData" class="card">
      <div class="row g-0">
        <!-- 圖片 -->
        <div class="col-md-12">
          <div class="row justify-content-center">
            <div class="col-auto">
              <img
                :src="`/img/commissions/${commissionsData.photo}`"
                class="img-fluid rounded-start rounded rounded-3"
                :alt="commissionsData.title"
                style="object-fit: cover; height: 100%"
              />
            </div>
          </div>
        </div>
        <!-- 內容 -->
        <div class="col-md-8">
          <div class="card-body">
            <h2 class="card-title">{{ commissionsData.title }}</h2>
            <p class="card-text text-muted">{{ commissionsData.description }}</p>

            <!-- 基本資訊 -->
            <ul class="list-group list-group-flush mb-3">
              <li class="list-group-item"><strong>價格:</strong> {{ commissionsData.price }} 元</li>
              <li class="list-group-item">
                <strong>繪師:</strong> {{ commissionsData.artist.username }}
              </li>
              <li class="list-group-item">
                <strong>剩餘名額:</strong> {{ commissionsData.remainingQuota }} /
                {{ commissionsData.quota }}
              </li>
              <li class="list-group-item">
                <strong>交貨時間:</strong> {{ commissionsData.deliveryDaysMin }} -
                {{ commissionsData.deliveryDaysMax }} 天
              </li>
              <li class="list-group-item">
                <strong>到期時間:</strong> {{ formatDate(commissionsData.expiresTime) }}
              </li>
              <li class="list-group-item">
                <strong>狀態:</strong> {{ commissionsData.status === 'Y' ? '開放' : '關閉' }}
              </li>
            </ul>

            <!-- 詳細資訊 -->
            <h5>委託詳情</h5>
            <ul class="list-group list-group-flush mb-3">
              <li class="list-group-item">
                <strong>交貨備註:</strong> {{ commissionsData.detail.deliveryNote }}
              </li>
              <li class="list-group-item">
                <strong>授權:</strong> {{ commissionsData.detail.authorization }}
              </li>
              <li class="list-group-item">
                <strong>修改政策:</strong> {{ commissionsData.detail.revisionPolicy }}
              </li>
              <li class="list-group-item">
                <strong>付款階段:</strong> {{ commissionsData.detail.paymentStages }}
              </li>
            </ul>

            <!-- 委託按鈕 -->
            <button
              class="btn btn-primary"
              @click="requestCommission"
              :disabled="commissionsData.status !== 'Y' || commissionsData.remainingQuota <= 0"
            >
              委託
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { commissionsByIdAPI } from '@/apis/commissionsAPI'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
const { getRole, isLogin } = storeToRefs(useUsersStore())
// 狀態管理
const route = useRoute()
const router = useRouter()
const commissionsData = ref(null) // 修改為 ref 對象
const loading = ref(true)
const error = ref(null)

// 格式化日期
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 委託按鈕事件
const requestCommission = () => {
  // 寫一個判斷，使用者是否為登入狀態，並且身分是委託者
  console.log('登入狀態', isLogin.value)
  console.log('使用者身分', getRole.value)

  if (!isLogin.value) {
    // 如果未登入，跳轉到登入頁面
    router.push({ name: 'login' }) // 假設登入頁面的路由名稱為 'Login'
    return
  }
  if (getRole.value === 'client') {
    // 如果是，則跳轉到委託頁面
    // 這裡可以使用 Vue Router 的導航守衛來實現
    router.push({ name: 'orderForm', params: { id: route.params.id } })
  } else {
    // 如果不是，則跳轉到登入頁面
    // 這裡可以使用 Vue Router 的導航守衛來實現
    Swal.fire({
      icon: 'info',
      title: '請先登入或確認您的身份！',
      showConfirmButton: true,
    })
  }
  // 如果是，則跳轉到委託頁面
  // 如果不是，則跳轉到登入頁面
  // 這裡可以使用 Vue Router 的導航守衛來實現

  // alert('委託功能即將推出！')
}

// 獲取委託資料
onMounted(async () => {
  try {
    const res = await commissionsByIdAPI(route.params.id) // 使用 commissionId
    console.log(res)

    if (res.status) {
      commissionsData.value = res.data.data // 直接賦值給 ref
    } else {
      error.value = res.message || '無法獲取委託資料'
    }
  } catch (err) {
    error.value = err.message || '請求失敗'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.list-group-item {
  padding: 0.75rem 1.25rem;
}
</style>
