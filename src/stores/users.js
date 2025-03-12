import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI, logoutAPI, checkTokenAPI, registerAPI, checkNameAPI } from '@/apis/authAPI'
import { listAPI } from '@/apis/userAPI'
export const useUsersStore = defineStore('user', () => {
  const userData = ref([])
  const userListData = ref([])
  const getUserList = async () => {
    const res = await listAPI()
    if (res.status) {
      userListData.value = res.data
      return res
    } else {
      return res
    }
  }
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
    return res.data
  }
  const checkName = async ({ username }) => {
    const res = await checkNameAPI({ username })
    return res.data
  }


  return { userData, userListData, login, logout, checkToken, register, checkName, getUserList }
},
  {
    persist: true,
  }
)
