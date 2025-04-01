<!-- src/components/Layer2Add.vue -->
<template>
  <div>
    <h2 class="mb-4">新增欄位</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="layer1Id" class="form-label">欄位</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model.number="form.layer1Id"
        >
          <option selected disabled>請選擇分類</option>
          <option :value="item.layer1Id" v-for="item in layer1List" :key="item.layer1Id">
            {{ item.layer1Name }} 類型({{
              item.type == 'radio' ? '單選' : item.type == 'checkbox' ? '多選' : item.type
            }})
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="layer2Name" class="form-label">新增選項名稱</label>
        <input
          v-model="form.layer2Name"
          type="text"
          class="form-control"
          id="layer2Name"
          required
        />
      </div>
      <div class="mb-3">
        <div class="form-check form-switch">
          <label class="form-check-label" for="active"
            >{{ form.active ? '開啟' : '關閉' }}狀態</label
          >
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="active"
            v-model="form.active"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">儲存</button>
      <router-link to="/admin/layer/layer2List" class="btn btn-secondary ms-2">返回</router-link>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLayerStore } from '@/stores/layer'
import Swal from 'sweetalert2'
const { Layer1List } = storeToRefs(useLayerStore())
const { getLayer1Data, addLayer2 } = useLayerStore()

const router = useRouter()
const layer2List = ref([])
const layer1List = ref([])
onMounted(async () => {
  await getLayer1Data()
  const filteredLayer1 = Layer1List.value.filter(
    (item) => item.type === 'radio' || item.type === 'checkbox'
  )

  // 存入新的變數
  layer1List.value = filteredLayer1
  console.log(layer1List.value)
})
const form = ref({
  layer1Id: 1,
  layer2Name: '',
  types: 'T',
  active: true,
})

const submitForm = async () => {
  // 將資料轉換為符合後端要求的格式
  form.value.active = form.value.active ? 'Y' : 'N'
  const res = await addLayer2(form.value)
  console.log(res)

  if (res.status) {
    Swal.fire({
      icon: 'success',
      title: '新增成功',
      showConfirmButton: false,
    }).then(() => {
      console.log(res)

      router.push('/admin/layer/layer2List')
    })
  }
}
</script>
