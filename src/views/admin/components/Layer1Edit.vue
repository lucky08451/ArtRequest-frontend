<template>
  <div class="container">
    <h2 class="mb-4">編輯分類</h2>
    <form @submit.prevent="submitForm" v-if="layer1Form">
      <div class="mb-3">
        <label for="layer1Name" class="form-label">名稱</label>
        <input
          v-model="layer1Form.layer1Name"
          type="text"
          class="form-control"
          id="layer1Name"
          required
        />
      </div>
      <div class="mb-3">
        <div class="mb-3">
          <label for="types" class="form-label">類型</label>
          <select v-model="layer1Form.type" class="form-select" id="type" disabled>
            <option value="0" disabled>請選擇類型</option>
            <option value="text">文字 (T)</option>
            <option value="radio">單選 (R)</option>
            <option value="checkbox">複選 (C)</option>
            <option value="textarea">多行文字 (X)</option>
            <option value="file">檔案 (F)</option>
          </select>
        </div>
      </div>
      <div class="mb-3">
        <label for="seq" class="form-label">排序</label>
        <input
          v-model.number="layer1Form.seq"
          type="number"
          class="form-control"
          :max="Layer1List.length"
          :min="1"
          :step="1"
          id="seq"
          required
        />
      </div>
      <div class="mb-3">
        <div class="form-check form-switch">
          <label class="form-check-label" for="active"
            >欄位{{ layer1Form.required ? '必選' : '非必選' }}</label
          >
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="active"
            v-model="layer1Form.required"
          />
        </div>
      </div>
      <div class="mb-3">
        <div class="form-check form-switch">
          <label class="form-check-label" for="active"
            >{{ layer1Form.active ? '開啟' : '關閉' }}狀態</label
          >
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="active"
            v-model="layer1Form.active"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">儲存</button>
      <router-link to="/admin/layer/layer1List" class="btn btn-secondary ms-2">返回</router-link>
    </form>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useLayerStore } from '@/stores/layer'
import Swal from 'sweetalert2'
const { Layer1List } = storeToRefs(useLayerStore())
const { getLayer1Data, updateLayer1ById } = useLayerStore()
const route = useRoute()
const router = useRouter()
const layer1Id = route.params.id
const layer1Form = ref(null)
onMounted(async () => {
  if (!Layer1List.value.length) {
    await getLayer1Data()
  }
  const foundItem = Layer1List.value.find((item) => item.layer1Id == layer1Id)
  if (foundItem) {
    layer1Form.value = { ...foundItem }
    console.log('123')
    console.log(layer1Form.value)
    // 將 active 轉換為布林值;
    layer1Form.value.active = layer1Form.value.active = 'Y' ? true : false
    layer1Form.value.required = layer1Form.value.required = 'Y' ? true : false
    console.log(layer1Form.value)
  } else {
    console.error('未找到對應的 layer1Id:', layer1Id)
    // router.push('/admin/layer/layer1List') // 找不到時跳回列表
  }
})
console.log(layer1Id)
const submitForm = async () => {
  console.log(layer1Form.value)
  // 將 active 轉換為 'Y' 或 'N'
  layer1Form.value.active = layer1Form.value.active ? 'Y' : 'N'
  layer1Form.value.required = layer1Form.value.required ? 'Y' : 'N'
  const res = await updateLayer1ById(layer1Id, layer1Form.value)
  if (res.status) {
    Swal.fire({
      icon: 'success',
      title: '更新成功',
      showConfirmButton: false,
    }).then(() => {
      // console.log(res)

      router.push('/admin/layer/layer1List')
    })
  }
}
</script>

<style scoped></style>
