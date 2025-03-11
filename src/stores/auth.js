import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI, logoutAPI, checkTokenAPI, registerAPI } from '@/apis/authAPI'
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
  const logout = async () => {
    const res = await logoutAPI()
    if (res.status) {
      userData.value = []
      return res
    } else {
      return res
    }
  }
  const checkToken = async () => {
    const res = await checkTokenAPI()
    if (res.status) {
      userData.value = res.data
      return res
    } else {
      return res
    }

  }
  const register = async (regData) => {
    const res = await registerAPI(regData)
    return res
  }


  return { userData, login, logout, checkToken, register }
})
