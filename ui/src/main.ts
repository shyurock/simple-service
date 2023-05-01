import {createApp} from 'vue'
import './styles/style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import '@/styles/index.scss'
import router from "./router" // global css

createApp(App)
    .use(ElementPlus)
    .use(router)
    .mount('#app')
