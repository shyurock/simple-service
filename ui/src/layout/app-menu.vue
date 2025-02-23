<script setup lang="ts">
import {ref} from 'vue'
import AppMenuItem from './app-menu-item.vue'
import type {MenuItem} from 'primevue/menuitem'

const model = ref<MenuItem[]>([
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Page', icon: 'pi pi-address-book', to: '/page' }
        ]
    },
  {
    label: 'Admin',
    items: [
      { label: 'Users', icon: 'pi pi-fw pi-home', to: '/admin/users' },
      { label: 'Roles', icon: 'pi pi-address-book', to: '/admin/roles' }
    ]
  },
])
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style scoped>

</style>
