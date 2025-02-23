<script setup lang="ts">
import ContentHeader from '@/components/content-header.vue'
</script>
<template>
    <content-header title="Dashboard" :buttons="[{icon: 'mdi-autorenew', onClick: () => {}}]" />
    <el-row justify="space-between">
        <el-col md="3" sm="2" v-for="i in [1,2,3]">
            <h1>Text</h1>
        </el-col>
    </el-row>
</template>