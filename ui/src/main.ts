import {createApp} from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import router from "@/router"
import '@/assets/vendor/index.js'

createApp(App)
    .use(ElementPlus)
    .use(router)
    .mount('#app')
