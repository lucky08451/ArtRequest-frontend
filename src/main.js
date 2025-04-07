import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import VueEasyLightbox from 'vue-easy-lightbox'

import { Chart as ChartJS } from 'chart.js'
import { Line } from 'vue-chartjs'  // 這是正確的導入方式
// 註冊 chart.js 相關的模組
import {
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
const imgURL = import.meta.env.VITE_IMAGE_URL;
// 註冊 chart.js 模組
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const app = createApp(App)
const pinia = createPinia()
app.config.globalProperties.$imgURL = imgURL;
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(VueEasyLightbox)
// 註冊 Line 組件
app.component('Line', Line)
app.mount('#app')
