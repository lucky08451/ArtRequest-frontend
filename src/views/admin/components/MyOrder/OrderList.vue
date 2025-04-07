<template>
  <div class="container-fluid mt-4">
    <h2>訂單列表</h2>
    <div class="row">
      <div class="col-12">
        <table class="table table-bordered table-sm">
          <thead>
            <tr>
              <th>訂單 ID</th>
              <th>委託 ID</th>
              <th>客戶 ID</th>
              <th>繪師 ID</th>
              <th>狀態</th>
              <th>總金額</th>
              <th>建立時間</th>
              <th>詳細資訊</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.orderId">
              <td>{{ order.orderId }}</td>
              <td>{{ order.commissionId }}</td>
              <td>{{ order.clientId }}</td>
              <td>{{ order.artistId }}</td>
              <td>
                {{
                  statusList.find((status) => status.value === order.status)?.label || '未知狀態'
                }}
              </td>
              <td>{{ order.totalPrice }}</td>
              <td>{{ order.createTime }}</td>
              <td>
                <button class="btn btn-primary status-btn" @click="toggleDetails(order.orderId)">
                  查看
                </button>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    v-for="status in statusList"
                    :key="status.value"
                    class="btn btn-secondary status-btn"
                    :class="{ active: order.status === status.value }"
                    :disabled="order.status === status.value"
                    @click="updateOrderStatus(order.orderId, status.value)"
                  >
                    {{ status.label }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="selectedOrder" class="mt-3">
      <h4>訂單詳細資訊 - {{ selectedOrder.orderId }}</h4>
      <ul class="list-group">
        <li class="list-group-item" v-for="detail in selectedOrder.order_details" :key="detail.id">
          <strong>{{ detail.name }}:</strong>

          <template v-if="detail.type === 'photo'">
            <img
              :src="`${imgURL}/orderFrom/${detail.value}`"
              alt="圖片"
              class="lightbox-thumbnail"
              @click="openLightbox(detail.value)"
            />
          </template>
          <template v-else>
            {{ detail.value }}
          </template>
        </li>
      </ul>
    </div>
    <vue-easy-lightbox
      :visible="lightboxVisible"
      :imgs="lightboxImage"
      @hide="lightboxVisible = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { OrderListAPI, updateOrderAPI } from '@/apis/orderAPI'
import Swal from 'sweetalert2'
import VueEasyLightbox from 'vue-easy-lightbox'
const imgURL = import.meta.env.VITE_IMAGE_URL

const lightboxVisible = ref(false)
const lightboxImage = ref('')

const openLightbox = (imageUrl) => {
  lightboxImage.value = imgURL + '/orderFrom/' + imageUrl
  lightboxVisible.value = true
}
// 狀態列表
const statusList = [
  { value: 'pending', label: '待處理' },
  { value: 'accepted', label: '已接受' },
  { value: 'in_progress', label: '進行中' },
  { value: 'completed', label: '已完成' },
  { value: 'canceled', label: '已取消' },
]
const orders = ref([])
onMounted(async () => {
  // 獲取訂單列表
  const res = await OrderListAPI()
  console.log(res)

  if (res.data) {
    orders.value = res.data.data
  } else {
    console.error('獲取訂單列表失敗:', res.statusText)
  }
})
const selectedOrder = ref(null)

const toggleDetails = (orderId) => {
  if (selectedOrder.value?.orderId === orderId) {
    // 如果當前選中的訂單是點擊的訂單，則關閉詳細資訊
    selectedOrder.value = null
  } else {
    // 否則，顯示該訂單的詳細資訊
    selectedOrder.value = orders.value.find((order) => order.orderId === orderId) || null
  }
}
// 更新訂單狀態
const updateOrderStatus = async (orderId, newStatus) => {
  console.log('更新訂單狀態:', orderId, newStatus)

  try {
    // 假設 API URL 為 /api/orders/{orderId}/status
    const res = await updateOrderAPI(orderId, {
      status: newStatus,
    })
    console.log(res)

    if (res.data.status) {
      Swal.fire({
        icon: 'success',
        title: '狀態更新成功',
        text: `訂單 ${orderId} 狀態已更新為 ${newStatus}`,
      }).then(() => {
        // 關閉提示框後重新載入頁面
        window.location.reload()
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: '狀態更新失敗',
        text: `訂單 ${orderId} 狀態更新失敗`,
      })
    }
  } catch (error) {
    console.error('更新訂單狀態失敗:', error)
    Swal.fire({
      icon: 'error',
      title: '狀態更新失敗',
      text: `訂單 ${orderId} 狀態更新失敗`,
    })
  }
}
</script>

<style>
.container {
  max-width: 900px;
}
.status-btn {
  min-width: 80px; /* 設定按鈕的最小寬度 */
  text-align: center; /* 文字置中 */
  white-space: nowrap; /* 防止文字換行 */
}
.btn-group {
  display: flex; /* 確保按鈕組在同一行 */
  gap: 5px; /* 按鈕之間的間距 */
}
.lightbox-thumbnail {
  width: 100px;
  height: auto;
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.2s;
}
.lightbox-thumbnail:hover {
  transform: scale(1.1);
}
</style>
