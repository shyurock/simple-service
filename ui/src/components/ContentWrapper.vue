<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: () => ''
  }
})
</script>

<template>
<div>
  <div class="p-d-flex p-jc-between p-ai-center p-mb-3">
    <div>
      <slot name="title">{{ title }}</slot>
    </div>
    <div>
      <slot name="actions" />
    </div>
  </div>
  <slot />
</div>
</template>

<style scoped>

</style>