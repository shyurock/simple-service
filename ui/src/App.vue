<script setup lang="ts">
import api from "./api";

const handle = () => api.authController.login('admin', 'admin')
</script>

<template>
      <router-view />
</template>
