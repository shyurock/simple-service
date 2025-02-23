<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: '1', username: 'user1', createdDate: '2024-01-01T20:20:00', lastLoginDate: '2024-01-01T20:20:00', roles: ['admin'] }
])
</script>

<template>
  <div>
    <DataTable
      :value="data"
    >
      <Column>
        <template #body="{ data }">
          <Avatar shape="circle" image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format" />
        </template>
      </Column>
      <Column field="username" header="username" />
      <Column field="createdDate" header="created" />
      <Column field="lastLoginDate" header="last login" />
      <Column field="roles" header="roles" />
      <Column header="actions">
        <template #body="{ data }">
          <Button outlined label="edit" />
          <Button outlined severity="danger" label="del" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>