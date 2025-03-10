import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/authAPI'
export const useUsersStore = defineStore('user', () => {
  const userData = ref([])
  const login = async ({ username, password }) => {
    const res = await loginAPI({ username, password })
    if (res.status) {
      userData.value = res.data
      return res
    } else {
      return res
    }
  }


  return { userData, login }
})
