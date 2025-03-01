<script setup lang="ts">

</script>

<template>
  <div class="error-container"
       style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh;">
    <svg class="error-image" width="200" height="200" viewBox="0 0 24 24">
      <path fill="currentColor"
            d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8s-8-3.59-8-8s3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
    <div class="error-content">
      <h1>404</h1>
      <p>Sorry, page not found</p>
      <router-link to="/" class="home-link">Home</router-link>
    </div>
  </div>

</template>

<style scoped>

</style>