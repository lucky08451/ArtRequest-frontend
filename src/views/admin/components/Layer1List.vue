<template>
  <div class="container">
    <h2 class="mb-4">Layer1 清單</h2>
    <div class="row">
      <div class="col-3 mb-3">
        <router-link to="/admin/layer/layer1add" class="btn btn-primary">新增欄位</router-link>
      </div>
    </div>
    <table class="table table-hover table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">欄位名稱</th>
          <th scope="col">類型</th>
          <th scope="col">排序</th>
          <th scope="col">必填</th>
          <th scope="col">啟用狀態</th>
          <th scope="col">功能</th>
        </tr>
      </thead>
      <tbody v-if="list && list.length > 0">
        <tr v-for="item in list" :key="item.layer1Id">
          <td scope="row">{{ item.layer1Id }}</td>
          <td>{{ item.layer1Name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.seq }}</td>
          <td>{{ item.required === 'Y' ? '是' : '否' }}</td>
          <td>{{ item.active === 'Y' ? '是' : '否' }}</td>
          <td>
            <router-link
              :to="{ path: '/admin/layer/layer1Edit/' + item.layer1Id }"
              class="btn btn-warning"
              >編輯</router-link
            >
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="5" class="text-center">沒有資料</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLayerStore } from '@/stores/layer'
const { Layer1List } = storeToRefs(useLayerStore())
const { getLayer1Data } = useLayerStore()
const list = ref(null)
onMounted(async () => {
  await getLayer1Data()
  list.value = Layer1List.value
  console.log(list.value)
})
</script>

<style scoped></style>
