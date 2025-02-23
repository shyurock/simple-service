import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useApi } from '@/composables/use-api.ts'
import { computed, ref } from 'vue'
import type { UserInfo } from '@/api/api.ts'
import router from "../router";

export const userUserStore = defineStore('userStore', () => {
    const { api } = useApi()
    const user = ref<UserInfo>()
    const token = useStorage('token', null)

    const refreshUser = () => {
        return api.userController.userInfo()
            .then(res => {
                user.value = res.data
            })
    }

    const login = (username, password) => {
        return api.authController.login({ username, password })
            .then(() => token.value = "true")
            .then(refreshUser)
    }

    const logout = () => {
        return api.authController.logout()
            .finally(() => {
                user.value = undefined
                token.value = undefined
            })
            .then(() => router.push("/login"))
    }

    const isLoggedIn = computed(() => token.value > '' )

    return {
        login,
        logout,
        refreshUser,
        isLoggedIn
    }
})