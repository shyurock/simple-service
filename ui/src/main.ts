import {createApp} from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import App from './App.vue'
import router from './router'

import './assets/styles.scss'
import 'primeicons/primeicons.css'

createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                primary: 'yellow',
                darkModeSelector: '.app-dark'
            }
        },
    })
    .use(router)
    .use(ToastService)
    .use(ConfirmationService)
    .mount('#app')
