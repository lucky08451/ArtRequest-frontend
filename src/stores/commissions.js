// stores/commissions.js
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { commissionsListAPI, getArtistCommissionsAPI, addCommissionsAPI, updateCommissionAPI, deleteCommissionAPI, commissionsByIdAPI } from '@/apis/commissionsAPI';
// import { useUsersStore } from '@/stores/users';
export const useCommissionsStore = defineStore('commissions', () => {
  // commissions: 委託列表
  const commissions = ref([]);
  // loading: 是否正在請求
  const loading = ref(false);
  // error: 錯誤信息
  const error = ref(null);
  // statusFilter: 篩選條件
  const statusFilter = ref('open');
  // 獲取委託列表
  const fetchCommissions = async (status = 'open') => {
    loading.value = true;
    error.value = null;
    statusFilter.value = status;

    try {
      const res = await commissionsListAPI(status);
      if (res.status) {
        commissions.value = res.data.data; // 存儲後端返回的資料
        return res;
      } else {
        error.value = res.data.message || '無法獲取資料';
        return res;
      }
    } catch (err) {
      error.value = err.message || '請求失敗';
      return { status: false, message: err.message };
    } finally {
      loading.value = false;
    }
  };
  const getcommissionsById = async (id) => {
    const res = await commissionsByIdAPI(id);
    if (res.data.status) {
      return res.data.data;
    }
    return res.data;
  }
  // 更新篩選條件並重新獲取資料
  const updateStatusFilter = async (newStatus) => {
    return await fetchCommissions(newStatus);
  };

  // 清空資料（可選）
  const clearCommissions = () => {
    commissions.value = [];
    error.value = null;
    statusFilter.value = 'open';
  };
  // 繪師功能
  // const usersStore = useUsersStore();
  // const myRole = usersStore.getRole();
  const artistCommissionsList = ref([]); // 繪師的委託列表
  const currentCommission = ref(null); // 當前編輯的委託
  // 獲取繪師的委託
  const fetchArtistCommissions = async (artistId) => {
    if (artistCommissionsList.value.length > 0) return;
    const res = await getArtistCommissionsAPI(artistId);
    if (res.status) {
      artistCommissionsList.value = res.data.data;
    }
    // console.log(artistCommissionsList.value);
  };
  const getArtistCommissionsList = computed(() => { return artistCommissionsList.value });
  const getCurrentCommission = computed(() => { return currentCommission.value });
  // 新增委託
  const addCommission = async (formData) => {
    const res = await addCommissionsAPI(formData);
    if (res.status) {
      artistCommissionsList.value.push(res.data.commission);
    }
    return res;
  };
  // 更新委託
  const updateCommission = async (id, formData) => {
    const res = await updateCommissionAPI(id, formData);
    if (res.status) {
      currentCommission.value = null; // 清空編輯狀態
    }
    return res;
  };
  // 刪除委託
  const deleteCommission = async (id) => {
    const res = await deleteCommissionAPI(id);
    if (res.status) {
      artistCommissionsList.value = artistCommissionsList.value.filter(c => c.id !== id);
    }
    return res;
  };
  // 設定當前編輯的委託
  const setCurrentCommission = (commission) => {
    currentCommission.value = { ...commission };
  };
  // 返回狀態和方法
  return {
    commissions,
    loading,
    error,
    statusFilter,
    fetchCommissions,
    updateStatusFilter,
    clearCommissions,
    fetchArtistCommissions,
    getArtistCommissionsList,
    getCurrentCommission,
    currentCommission,
    addCommission,
    updateCommission,
    deleteCommission,
    setCurrentCommission,
    getcommissionsById
  };
}, {
  persist: {
    // 配置持久化選項
    storage: localStorage, // 使用 localStorage 持久化
    paths: ['commissions', 'statusFilter'], // 指定需要持久化的狀態
  },
});
