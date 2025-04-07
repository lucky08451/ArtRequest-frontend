<template>
  <div class="container-fluid mt-4">
    <h2>我的訂單</h2>
    <div class="row">
      <div class="col-12">
        <table class="table table-bordered table-sm">
          <thead>
            <tr>
              <th>訂單 ID</th>
              <th>委託 ID</th>
              <th>繪師 ID</th>
              <th>狀態</th>
              <th>總金額</th>
              <th>建立時間</th>
              <th>詳細資訊</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.orderId">
              <td>{{ order.orderId }}</td>
              <td>{{ order.commissionId }}</td>
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
import { OrderListAPI } from '@/apis/orderAPI'
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
const selectedOrder = ref(null)

onMounted(async () => {
  // 獲取使用者訂單列表
  const res = await OrderListAPI()
  console.log(res)
  if (res.data) {
    orders.value = res.data.data
  } else {
    console.error('獲取訂單列表失敗:', res.statusText)
  }
})

const toggleDetails = (orderId) => {
  if (selectedOrder.value?.orderId === orderId) {
    selectedOrder.value = null
  } else {
    selectedOrder.value = orders.value.find((order) => order.orderId === orderId) || null
  }
}
</script>

<style>
.container {
  max-width: 900px;
}
.status-btn {
  min-width: 80px;
  text-align: center;
  white-space: nowrap;
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
