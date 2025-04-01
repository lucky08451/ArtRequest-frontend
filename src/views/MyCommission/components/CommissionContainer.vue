<!-- containers/CommissionListContainer.vue -->
<template>
  <commission-list
    :commissions="store.commissions"
    :loading="store.loading"
    :error="store.error"
    :has-commissions="store.commissions.length > 0"
    :status-filter="store.statusFilter"
    @change-filter="handleChangeFilter"
  />
</template>

<script setup>
import { onMounted } from 'vue'
import { useCommissionsStore } from '@/stores/commissions'
import CommissionList from './CommissionList.vue'

// 獲取 Store
const store = useCommissionsStore()

// 初始化時獲取資料
onMounted(() => {
  store.fetchCommissions() // 預設載入 'open' 狀態的委託
})

// 處理篩選條件變更
const handleChangeFilter = (status) => {
  store.updateStatusFilter(status)
}
</script>
