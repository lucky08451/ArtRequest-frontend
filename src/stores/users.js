import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { loginAPI, logoutAPI, checkTokenAPI, registerAPI, checkNameAPI } from '@/apis/authAPI'
import { listAPI, updateAPI, getUserIdAPI } from '@/apis/userAPI'
import { useRouter } from 'vue-router'
export const useUsersStore = defineStore('user', () => {
  const router = useRouter()

  const isLogin = ref(false)
  // 使用者資料
  const userData = ref({ status: false, data: {} })
  const userListData = ref([])
  // 獲取所有使用者資料
  const getUserList = async () => {
    if (userData.value.data.role == 'admin') {
      const res = await listAPI()
      if (res.status) {
        userListData.value = res.data.data
        return res
      } else {
        return res
      }
    }
  }
  const getUserData = async () => {
    const res = await getUserIdAPI(userData.value.data.id)
    userData.value = res.data
    return res.data.data
  }
  const login = async ({ username, password }) => {
    const res = await loginAPI({ username, password })
    if (res.status) {
      isLogin.value = true
      userData.value = res.data.data
      return res
    } else {
      return res
    }
  }
  const logout = async () => {
    userListData.value = []
    userData.value = { status: false, data: {} }
    isLogin.value = false
    const res = await logoutAPI()
    if (res.status) {
      // location.reload() // 重新整理頁面
      router.push('/login'); // 導航到登入頁
      return res
    } else {
      return res
    }
  }
  // 確認token是否有效
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

  const update = async (id, data) => {
    const res = await updateAPI(id, data)
    return res.data
  }
  const getRole = computed(() => userData.value.data.role || null)
  return { userData, userListData, isLogin, login, logout, checkToken, register, checkName, getUserList, update, getRole, getUserData }
},
  {
    persist: {
      // 配置持久化選項
      storage: localStorage, // 可選：sessionStorage
      paths: ['userData', 'userListData'] // 指定需要持久化的狀態
    }
  }
)
