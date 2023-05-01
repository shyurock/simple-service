import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {createHtmlPlugin} from 'vite-plugin-html'
import {resolve} from 'path'

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
      '@': resolve(__dirname, '/src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables";`
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:6000',
        changeOrigin: true,
        ws: true,
        // only https
        // secure: false
      }
    }
  }
})
