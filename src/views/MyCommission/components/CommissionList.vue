<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>委託列表</h3>
      <router-link to="/mycommission/add" class="btn btn-primary"> 新增委託 </router-link>
      <router-link to="/mycommission/addForm" class="btn btn-primary"> 新增委託表單 </router-link>
    </div>
    <div v-if="getArtistCommissionsList.length == 0" class="alert alert-info">目前沒有委託</div>
    <div v-else class="list-group">
      <div
        v-for="commission in getArtistCommissionsList"
        :key="commission.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <strong>{{ commission.title }}</strong>
          <p class="mb-0 text-muted">{{ commission.description || truncate(50) }}</p>
        </div>
        <div>
          <router-link
            :to="`/mycommission/edit/${commission.id}`"
            class="btn btn-sm btn-primary me-2"
            @click="setCurrentCommission(commission)"
          >
            編輯
          </router-link>
          <button class="btn btn-sm btn-danger" @click="deleteCommissionHandler(commission.id)">
            刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommissionsStore } from '@/stores/commissions'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'

const commissionsStore = useCommissionsStore()
const { deleteCommission, setCurrentCommission } = commissionsStore
const { getArtistCommissionsList } = storeToRefs(commissionsStore)
console.log(getArtistCommissionsList.value)

// 刪除委託
const deleteCommissionHandler = async (id) => {
  const result = await Swal.fire({
    title: '刪除委託',
    text: '確定要刪除此委託嗎？',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '確定',
    cancelButtonText: '取消',
  })

  if (result.isConfirmed) {
    try {
      await deleteCommission(id) // 等待非同步操作完成
      Swal.fire({
        title: '成功',
        text: '委託已刪除',
        icon: 'success',
        confirmButtonText: '確定',
      })
    } catch (error) {
      Swal.fire({
        title: '錯誤',
        text: '刪除委託失敗',
        icon: 'error',
        confirmButtonText: '確定',
      })
    }
  }
}

// 過濾器：截斷文字
const truncate = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}
</script>

<style scoped>
.list-group-item {
  padding: 1rem;
}
</style>
