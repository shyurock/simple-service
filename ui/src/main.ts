import {createApp} from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import router from "@/router"
import '@/router/permission.ts'
import './styles'
import {createPinia} from "pinia"

createApp(App)
    .use(ElementPlus)
    .use(router)
    .use(createPinia())
    .mount('#app')
