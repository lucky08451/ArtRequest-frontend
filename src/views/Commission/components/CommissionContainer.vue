<!-- containers/CommissionListContainer.vue -->
<template>
  <commission-list
    :commissions="commissionsStore.commissions"
    :loading="commissionsStore.loading"
    :error="commissionsStore.error"
    :has-commissions="commissionsStore.commissions.length > 0"
    :status-filter="commissionsStore.statusFilter"
    @change-filter="handleChangeFilter"
  />
</template>

<script setup>
import { onMounted } from 'vue'
import { useCommissionsStore } from '@/stores/commissions'
import CommissionList from './CommissionList.vue'

// 獲取 Store
const commissionsStore = useCommissionsStore()

// 初始化時獲取資料
onMounted(() => {
  commissionsStore.fetchCommissions() // 預設載入 'open' 狀態的委託
})

// 處理篩選條件變更
const handleChangeFilter = (status) => {
  commissionsStore.updateStatusFilter(status)
}
</script>
