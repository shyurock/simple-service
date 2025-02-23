<script setup lang="ts">
import {reactive} from 'vue'
import {useAuthStore} from '@/store/auth.ts'

const data = reactive({
    username: '',
    password: ''
})
const handleLogin = async () => {
    await useAuthStore().login(data.username, data.password)
}
</script>
<template>
    <div class="login-container">
        <el-card class="login-form">
            <el-form>
                <el-form-item class="large">
                    Personal Information
                </el-form-item>
                <el-form-item>
                    Enter your e-mail address and your password.
                </el-form-item>
                <el-form-item>
                    <el-input v-model="data.username" placeholder="email or login"/>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="data.password" placeholder="password"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleLogin">Sing me in</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<style lang="scss" scoped>
    .login-container {
        max-width: 315px;
        margin: 10% auto;
    }
</style>
