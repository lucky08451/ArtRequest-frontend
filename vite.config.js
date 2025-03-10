import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// https://vite.dev/config/
export default defineConfig({
  server: {
    // 設定開發服務器端口
    port: 8080,
    open: true, // 自動打開瀏覽器
    cors: true, // 允許跨域
    proxy: {
      '/api': {
        target: 'http://localhost:8000/api/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }

    },
  },
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
