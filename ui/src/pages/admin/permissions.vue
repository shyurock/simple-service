<script setup lang="ts">
import {ref} from 'vue'

const permissions = ref([
  {name: "read", description: "Can read content", users: "User, Admin"},
  {name: "write", description: "Can create and edit content", users: "Admin"},
  {name: "delete", description: "Can delete content", users: "Admin"}
])
</script>

<template>
  <DataTable :value="permissions">
    <Column field="name" title="name"/>
    <Column field="description" title="description"/>
    <Column field="users" title="users"/>
    <Column title="actions">
      <template #body="{ data }">
        <Button icon="" @click="addToUser(data)" label="Assign"/>
      </template>
    </Column>
  </DataTable>
</template>