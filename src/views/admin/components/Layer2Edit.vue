<!-- src/components/Layer2Edit.vue -->
<template>
  <div>
    <h2 class="mb-4">編輯 Layer2 (ID: {{ layer2Id }})</h2>
    <form @submit.prevent="submitForm" v-if="layer2Form">
      <div class="mb-3">
        <label for="layer1Id" class="form-label">欄位</label>
        <input
          v-model="layer2Form.layer1.layer1Name"
          type="text"
          class="form-control"
          id="layer1Id"
          disabled
        />
      </div>
      <div class="mb-3">
        <label for="layer2Name" class="form-label">選項名稱</label>
        <input
          v-model="layer2Form.layer2Name"
          type="text"
          class="form-control"
          id="layer2Name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="seq" class="form-label">排序</label>
        <input
          v-model.number="layer2Form.seq"
          type="number"
          class="form-control"
          id="seq"
          :max="maxSeq"
          :min="1"
          :step="1"
          required
        />
      </div>
      <div class="mb-3">
        <div class="form-check form-switch">
          <label class="form-check-label" for="active"
            >{{ layer2Form.active ? '開啟' : '關閉' }}狀態</label
          >
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="active"
            v-model="layer2Form.active"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">儲存</button>
      <router-link to="/admin/layer/layer2List" class="btn btn-secondary ms-2">返回</router-link>
    </form>
    <div v-else>載入中...</div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useLayerStore } from '@/stores/layer'
import Swal from 'sweetalert2'
const route = useRoute()
const router = useRouter()
const { Layer2List } = storeToRefs(useLayerStore())
const { getLayer2Data, updateLayer2ById } = useLayerStore()
const layer2Id = route.params.id
// 模擬本地資料
const layer2Form = ref(null)
onMounted(async () => {
  if (!Layer2List.value.length) {
    await getLayer2Data()
  }
  layer2Form.value = Layer2List.value.find((item) => item.layer2Id == layer2Id)
  layer2Form.value.active = layer2Form.value.active = 'Y' ? true : false
})
const maxSeq = computed(() => {
  return Layer2List.value.filter((item) => item.layer1Id == layer2Form.value.layer1Id).length
})

const submitForm = async () => {
  // 將 active 轉換為 'Y' 或 'N'
  layer2Form.value.active = layer2Form.value.active ? 'Y' : 'N'
  const res = await updateLayer2ById(layer2Id, layer2Form.value)
  if (res.status) {
    Swal.fire({
      icon: 'success',
      title: '更新成功',
      showConfirmButton: false,
    }).then(() => {
      router.push('/admin/layer/layer2List')
    })
  }
}
</script>
