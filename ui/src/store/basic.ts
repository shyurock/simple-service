import {defineStore} from "pinia";
import {nextTick} from "vue";
import router from "@/router";

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
        }
    },
    state: () => {
        return {
            token: ''
        }
    },
    persist: {
        storage: localStorage,
        path: ['token']
    }
})