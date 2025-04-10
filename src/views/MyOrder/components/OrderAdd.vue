<template>
  <div class="container mt-4">
    <h2>新增委託表單</h2>
    <form @submit.prevent="submitForm" novalidate>
      <div v-for="item in formData" class="mb-3 row" :key="item.layer1Id">
        <div class="col-3">
          <label class="form-label">{{ item.name }}</label>
        </div>
        <div class="col">
          <!-- Radio buttons -->
          <div v-if="item.type === 'radio'">
            <div
              v-for="layer1 in layerData.filter((item) => item.type === 'radio')"
              :key="layer1.layer1Id"
              class="row"
            >
              <div v-for="layer2 in layer1.layer2" :key="layer2.layer2Id" class="form-check col-3">
                <input
                  class="form-check-input"
                  type="radio"
                  :name="'layer' + item.layer1Id"
                  :value="layer2.layer2Name"
                  v-model="item.value"
                  :required="item.required === 'Y'"
                />
                <label class="form-check-label">{{ layer2.layer2Name }}</label>
              </div>
            </div>
          </div>

          <!-- Checkbox buttons -->
          <div v-if="item.type === 'checkbox'">
            <div
              v-for="layer1 in layerData.filter((item) => item.type === 'checkbox')"
              :key="layer1.layer1Id"
              class="row"
            >
              <div v-for="layer2 in layer1.layer2" :key="layer2.layer2Id" class="form-check col-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :name="'layer' + item.layer1Id"
                  :value="layer2.layer2Name"
                  v-model="item.value"
                  :required="item.required === 'Y'"
                />
                <label class="form-check-label">{{ layer2.layer2Name }}</label>
              </div>
            </div>
          </div>

          <!-- Textarea -->
          <div v-if="item.type === 'textarea'">
            <textarea
              class="form-control"
              :name="'layer' + item.layer1Id"
              v-model="item.value"
              rows="3"
              :required="item.required === 'Y'"
            ></textarea>
          </div>

          <!-- File input -->
          <div v-if="item.type === 'file'">
            <input
              class="form-control"
              type="file"
              :name="'layer' + item.layer1Id"
              @change="handleFileChange($event, item)"
              :required="item.required === 'Y'"
            />
          </div>
          <!-- text input -->
          <div v-if="item.type === 'text'">
            <input
              class="form-control"
              type="text"
              :name="'layer' + item.layer1Id"
              v-model="item.value"
              :required="item.required === 'Y'"
            />
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-6">
          <button type="submit" class="btn btn-primary w-100">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useLayerStore } from '@/stores/layer'
import { storeToRefs } from 'pinia'
import { addOrderAPI } from '@/apis/orderAPI'
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
// 獲取 委託ID
const commissionId = route.params.id
const { getLayer } = useLayerStore()
const { LayerList } = storeToRefs(useLayerStore())
const formData = ref([])
const layerData = ref([])
onMounted(async () => {
  // 假設這是從後端獲取的資料

  await getLayer()

  layerData.value = LayerList.value
  // 預處理表單數據，初始化 formData
  layerData.value.forEach((layer) => {
    let value = null

    // 根據 layer 的 type 設定預設值
    if (layer.type === 'checkbox') {
      value = [] // 默認為空數組，checkbox 類型可以多選
    } else if (layer.type === 'textarea' || layer.type === 'radio') {
      value = '' // 默認為空字串，textarea 類型
    } else if (layer.type === 'file') {
      value = null // 默認為 null，file 類型
    } else {
      value = '' // 默認為空字串，其他類型
    }

    // 將處理後的資料推入 formData
    formData.value.push({
      layer1Id: layer.layer1Id,
      name: layer.layer1Name,
      type: layer.type,
      required: layer.required,
      value: value,
    })
  })
  console.log(formData.value)
})
const handleFileChange = (event, item) => {
  const file = event.target.files[0]
  if (file) {
    item.value = file // 將選擇的檔案存入對應的表單項目
    console.log('選擇的檔案:', file)
  }
}
const submitForm = async () => {
  let isValid = true
  let errorMessage = ''
  // 檢查表單項目是否有效
  // 手動驗證表單項目
  formData.value.forEach((item) => {
    if (
      (item.required === 'Y' && !item.value) ||
      (Array.isArray(item.value) && item.value.length === 0)
    ) {
      // 如果是必填項且沒有值，則設置 isValid 為 false
      isValid = false
      // 這裡可以加上顯示錯誤訊息的邏輯
      errorMessage += `${item.name} |`
    }
  })
  if (errorMessage) {
    Swal.fire({
      icon: 'error',
      title: '表單驗證失敗',
      text: '請檢查必填欄位:' + errorMessage,
      showConfirmButton: true,
    })
  }

  if (isValid) {
    // 如果表單有效，執行提交操作
    console.log('提交的表單資料:', formData.value)
    // 這裡可以將表單資料發送到後端
    let formDataToSubmit = new FormData()
    formData.value.forEach((item) => {
      formDataToSubmit.append(item.name, item.value)
    })
    formDataToSubmit.append('commissionId', commissionId)
    const res = await addOrderAPI(formDataToSubmit)
    console.log(res)
    if (res.status) {
      Swal.fire({
        icon: 'success',
        title: '表單提交成功',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.push({
          name: 'my-order',
        })
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: '表單提交失敗',
        text: res.message,
      })
    }
    /* addOrderAPI(formData.value)
      .then((response) => {
        console.log('表單提交成功:', response)
      })
      .catch((error) => {
        console.error('表單提交失敗:', error)
      }) */
  } else {
    console.log('表單驗證失敗！')
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
