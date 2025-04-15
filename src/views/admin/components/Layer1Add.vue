<template>
  <div class="container">
    <h2 class="mb-4">新增分類</h2>
    <form @submit.prevent="submitForm">
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
        <label for="directions" class="form-label">說明</label>
        <input
          v-model="layer1Form.directions"
          type="text"
          class="form-control"
          id="directions"
          placeholder="請輸入說明(可以不填)"
          required
        />
      </div>
      <div class="mb-3">
        <div class="mb-3">
          <label for="types" class="form-label">類型</label>
          <select v-model="layer1Form.type" class="form-select" id="type" required>
            <option value="0" disabled>請選擇類型</option>
            <option value="text">文字 (T)</option>
            <option value="number">數字 (N)</option>
            <option value="radio">單選 (R)</option>
            <option value="checkbox">複選 (C)</option>
            <option value="textarea">多行文字 (X)</option>
            <option value="file">檔案 (F)</option>
          </select>
        </div>
      </div>
      <div class="mb-3">
        <div class="form-check form-switch">
          <label class="form-check-label" for="active"
            >欄位{{ layer1Form.required ? '必填' : '非必填' }}</label
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
import Swal from 'sweetalert2'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLayerStore } from '@/stores/layer'
const { addLayer1 } = useLayerStore()
const router = useRouter()
const layer1Form = ref({
  layer1Name: '',
  type: '0',
  active: true,
  required: true,
  directions: null,
})
const submitForm = async () => {
  if (layer1Form.value.type == '0') {
    Swal.fire({
      icon: 'error',
      title: '請選擇類型',
      showConfirmButton: false,
    })
    return
  }
  // 將 active 轉換為 'Y' 或 'N'
  layer1Form.value.active = layer1Form.value.active ? 'Y' : 'N'
  layer1Form.value.required = layer1Form.value.required ? 'Y' : 'N'
  layer1Form.value.directions = layer1Form.value.directions || null
  const res = await addLayer1(layer1Form.value)
  if (res.status) {
    Swal.fire({
      icon: 'success',
      title: '新增成功',
      showConfirmButton: false,
    }).then(() => {
      router.push('/admin/layer/layer1List')
    })
  }
  console.log(layer1Form.value)
}
</script>

<style scoped></style>
