import { defineStore } from 'pinia'
import api from '@/api'
import { nextTick } from 'vue'
import router from '@/router'
import {useApi} from "../composables/use-api.ts";

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: '',
            avatar: '',
            permissions: [],
            name: ''
        }
    },
    actions: {
        login(username, password) {
            const { api } = useApi()
            api.authController.login(username, password)
                .then(() => {
                    this.token = 'token'
                    api.userController.userInfo()
                        .then((res) => {
                            this.name = res.data.name
                            this.permissions = res.data.permissions
                            this.avatar = res.data.avatar

                            nextTick(() => {
                                router.push('/')
                            })
                        })
                })
        },
        logout() {
            api.authController.logOut()
                .then(() => {
                    this.token = ''
                    this.avatar = ''
                    this.permissions = []
                    this.name = ''
                })
        }
    },
    persist: {
        storage: localStorage,
        path: ['token', 'theme']
    }
})