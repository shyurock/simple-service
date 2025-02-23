<script setup lang="ts">
import {useRouter} from 'vue-router'

const router = useRouter()
const linkToLogin = () => {
    router.push('/auth/login')
}
</script>
<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <div class="text-center w-full mt-10">
                <h1>Page <span @click="linkToLogin">not</span> found</h1>
            </div>
        </div>
    </div>
</template>
