<!-- components/CommissionList.vue -->
<template>
  <div class="container mt-4">
    <h2 class="mb-3">委託列表</h2>

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

    <!-- 委託列表 -->
    <div v-if="hasCommissions" class="row">
      <div class="col-12 mb-3">
        <div class="row">
          <div class="col-4">
            <button @click="toggleSort" class="btn btn-primary">
              按時間排序 ({{ sortDirection === 'asc' ? '升序' : '降序' }})
            </button>
          </div>
        </div>
      </div>
      <div v-for="commission in commissions" :key="commission.id" class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100" @click="goToCommission(commission.id)">
          <img
            :src="`/img/commissions/${commission.photo}`"
            class="card-img-top"
            alt="委託圖片"
            style="object-fit: cover; height: 200px"
          />
          <div class="card-body">
            <h5 class="card-title">{{ commission.title }}</h5>
            <p class="card-text">{{ commission.description }}</p>
            <ul class="list-unstyled">
              <li><strong>價格:</strong> {{ commission.price }}</li>
              <li><strong>繪師:</strong> {{ commission.artist.username }}</li>
              <li>
                <strong>剩餘名額:</strong> {{ commission.remainingQuota }} /
                {{ commission.quota }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 無資料提示 -->
    <div v-else-if="!loading" class="alert alert-info" role="alert">無符合條件的委託</div>

    <!-- 分頁控制 -->
    <nav v-if="pagination.total > pagination.per_page" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !pagination.prev_page_url }">
          <button class="page-link" @click="changePage(pagination.current_page - 1)">上一頁</button>
        </li>
        <li
          v-for="n in pagination.last_page"
          :key="n"
          class="page-item"
          :class="{ active: n === pagination.current_page }"
        >
          <button class="page-link" @click="changePage(n)">{{ n }}</button>
        </li>
        <li class="page-item" :class="{ disabled: !pagination.next_page_url }">
          <button class="page-link" @click="changePage(pagination.current_page + 1)">下一頁</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { commissionsListAPI } from '@/apis/commissionsAPI' // 假設有這個 API

// Props
defineProps({
  statusFilter: {
    type: String,
    default: 'open',
  },
})

// 狀態管理
const router = useRouter()
const commissions = ref([])
const loading = ref(true)
const error = ref(null)
const hasCommissions = ref(false)
const pagination = ref({
  current_page: 1,
  per_page: 9,
  total: 0,
  last_page: 1,
  next_page_url: null,
  prev_page_url: null,
})
const currentPage = ref(1)
const sort = ref('DESC')
const toggleSort = () => {
  sort.value = sort.value === 'DESC' ? 'ASC' : 'DESC'
  fetchCommissions()
}
// 跳轉到委託詳細頁面
const goToCommission = (id) => {
  router.push(`/commissions/${id}`)
}

// 獲取委託列表
const fetchCommissions = async () => {
  loading.value = true
  try {
    const res = await commissionsListAPI({
      page: currentPage.value,
      per_page: pagination.value.per_page,
      sort: sort.value,
    })
    if (res.data.status) {
      commissions.value = res.data.data
      pagination.value = res.data.pagination
      hasCommissions.value = commissions.value.length > 0
    } else {
      error.value = res.data.message || '無法獲取委託資料'
      hasCommissions.value = false
    }
  } catch (err) {
    error.value = err.message || '請求失敗'
    hasCommissions.value = false
  } finally {
    loading.value = false
  }
}

// 切換頁面
const changePage = (page) => {
  if (page > 0 && page <= pagination.value.last_page && page !== currentPage.value) {
    currentPage.value = page
    fetchCommissions()
  }
}

// 頁面載入時獲取數據
onMounted(() => {
  fetchCommissions()
})
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pagination .page-link {
  cursor: pointer;
}
</style>
