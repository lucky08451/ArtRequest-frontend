import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// https://vite.dev/config/
export default defineConfig({
  base: '/ArtRequest_html/',
  // server: {
  //   // 設定開發服務器端口
  //   host: '0.0.0.0',
  //   port: 5173,
  //   open: true, // 自動打開瀏覽器
  //   cors: true, // 允許跨域
  // },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/index.scss" as *;
        `,
      }
    }
  },
})
