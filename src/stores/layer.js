import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { addLayer1API, addLayer2API, getLayer1API, getLayer2API, updateLayer1ByIdAPI, updateLayer2ByIdAPI, getLayerAPI } from '@/apis/layerAPI'
export const useLayerStore = defineStore('layer', () => {
  const LayerData = ref([])
  const Layer1Data = ref([])
  const Layer2Data = ref([])
  const Layer1List = computed(() => Layer1Data.value)
  const Layer2List = computed(() => Layer2Data.value)
  const getLayer1Data = async () => {
    const res = await getLayer1API()
    // console.log(res);
    if (res.data.status) {
      Layer1Data.value = res.data.data
    }
  }
  const getLayer2Data = async () => {
    const res = await getLayer2API()
    if (res.data.status) {
      Layer2Data.value = res.data.data
    }
  }
  const addLayer1 = async (data) => {
    const res = await addLayer1API(data)
    return res.data
  }
  const addLayer2 = async (data) => {
    const res = await addLayer2API(data)
    return res.data
  }
  const updateLayer1ById = async (id, data) => {
    const res = await updateLayer1ByIdAPI(id, data)
    return res.data
  }
  const updateLayer2ById = async (id, data) => {
    const res = await updateLayer2ByIdAPI(id, data)
    return res.data
  }
  const getLayer = async () => {
    const res = await getLayerAPI()
    LayerData.value = res.data.data
    return res.data
  }
  const LayerList = computed(() => {
    return LayerData.value;
  })
  return { getLayer1Data, getLayer2Data, updateLayer1ById, updateLayer2ById, addLayer1, addLayer2, Layer1List, Layer2List, getLayer, LayerList }
},
  {
    persist: {
      // 配置持久化選項
      storage: localStorage, // 可選：sessionStorage
      paths: ['Layer1Data', 'Layer2Data'] // 指定需要持久化的狀態
    }
  })
