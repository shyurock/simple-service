import {defineStore} from 'pinia'
import {nextTick} from 'vue'
import router from '@/router'

export const basicStore = defineStore('basic', {
    actions: {
        setToken(data: string) {
            this.token = data
        },
        reset() {
            this.token = ''
            nextTick(() => {
                router.push('/login')
            })
        },
        changeTheme(theme: string) {
            this.theme = theme
        }
    },
    state: () => {
        return {
            token: '',
            theme: 'light'
        }
    },
    persist: {
        storage: localStorage,
        path: ['token', 'theme']
    }
})