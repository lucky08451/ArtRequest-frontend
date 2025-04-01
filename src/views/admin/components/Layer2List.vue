<template>
  <div>
    <h2 class="mb-4">Layer2 清單</h2>
    <router-link to="/admin/layer/layer2Add" class="btn btn-success mb-3">新增欄位</router-link>
    <table class="table table-hover table-sm">
      <thead>
        <tr>
          <th>layer2ID</th>
          <th>欄位</th>
          <th>欄位類型</th>
          <th>選項</th>
          <th>排序</th>
          <th>啟用狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody v-if="list && list.length > 0">
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.layer2Id }}</td>
          <td>{{ item.layer1.layer1Name }}</td>
          <td>{{ item.layer1.type }}</td>
          <td>{{ item.layer2Name }}</td>
          <td>{{ item.seq }}</td>
          <td>{{ item.active === 'Y' ? '是' : '否' }}</td>
          <td>
            <router-link
              :to="'/admin/layer/layer2Edit/' + item.layer2Id"
              class="btn btn-primary btn-sm me-2"
            >
              編輯
            </router-link>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="7" class="text-center">沒有資料</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLayerStore } from '@/stores/layer'
const { Layer2List } = storeToRefs(useLayerStore())
const { getLayer2Data } = useLayerStore()
const list = ref(null)

onMounted(async () => {
  await getLayer2Data()
  list.value = Layer2List.value
  console.log(list.value)
})
// 模擬本地資料
// const layer2List = ref([
//   { id: 1, layer1Id: 1, layer2Name: '姓名', types: 'T', seq: 1, active: 'Y' },
//   { id: 2, layer1Id: 1, layer2Name: '電話', types: 'T', seq: 2, active: 'Y' },
//   { id: 3, layer1Id: 2, layer2Name: '商品名稱', types: 'T', seq: 1, active: 'Y' },
//   { id: 4, layer1Id: 2, layer2Name: '數量', types: 'T', seq: 2, active: 'Y' },
// ])
</script>
