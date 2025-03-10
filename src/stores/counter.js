import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getData } from '@/apis/testAPI'

export const useCounterStore = defineStore('counter', () => {
  // 定義數據(state)
  const count = ref(0)
  // 定義異步方法(actions 同步+異步)
  const increment = () => {
    count.value++
  }
  const doubleCount = computed(() => count.value * 2)
  const list = ref([])
  const getList = async () => {
    const res = await getData()
    if (res.status) {
      console.log(res)
      list.value = res.data
    } else {
      console.log("失敗")

    }

  }

  return { count, doubleCount, increment, getList, list }
})
