import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {createHtmlPlugin} from 'vite-plugin-html'
import {resolve} from 'path'

const srcPath = resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      createHtmlPlugin({
        minify: true
      })
  ],
  resolve: {
    alias: {
      '@/': `${srcPath}/`
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables";`
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        ws: true,
        // only https
        // secure: false
      },
      '/media': {
        target: 'http://localhost:8090',
        changeOrigin: true,
      }
    }
  }
})
