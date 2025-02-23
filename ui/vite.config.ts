import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath} from 'node:url'
import Components from 'unplugin-vue-components/vite'
import {PrimeVueResolver} from '@primevue/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [PrimeVueResolver()]
        })
    ],
    css: ['@/assets/tailwind.css'],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8090/api',
                changeOrigin: true
            }
        }
    }
});
