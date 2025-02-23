import {createApp} from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'
import './styles/index.js'
import {createPinia} from 'pinia'
import piniaPluginPersistent from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistent)

createApp(App)
    .use(ElementPlus)
    .use(router)
    .use(pinia)
    .mount('#app')
