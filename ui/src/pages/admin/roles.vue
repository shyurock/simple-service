<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useApi } from '@/composables/use-api.ts'
import type { PermissionDto, RoleDto } from '@/api/api.ts'
import ContentWrapper from '@/components/ContentWrapper.vue'
import { useToast } from 'primevue/usetoast'

const { api } = useApi()
const toast = useToast()

const permissions = ref<PermissionDto[]>([])
const roles = ref<RoleDto[]>([])
const displayDialog = ref(false)
const selectedRole = ref<RoleDto | null>(null)

const editRole = (role?: RoleDto) => {
  selectedRole.value = role ?? {
        name: '',
        description: '',
        permissions: []
    }
    displayDialog.value = true
}

const saveRole = () => {
  api.userController.updateRole(selectedRole.value)
      .then(res => {
        roles.value.push(res.data)
        toast.add({severity: 'success', summary: 'Role successfully saved'})
      })
      .finally(closeModal)
}

const closeModal = () => {
    selectedRole.value = null
    displayDialog.value = false
}

onMounted(() => {
  api.userController.permissions().then(res => permissions.value = res.data)
  api.userController.roles().then(res => roles.value = res.data)
})

</script>

<template>
  <ContentWrapper title="Roles">
    <template #title>
        <Button icon="pi pi-plus" outlined @click="editRole" label="Role"/>
    </template>
    <DataTable :value="roles">
      <Column field="name" title="name"/>
      <Column field="description" title="description"/>
      <Column field="users" title="users">
        <template #body="{ data }">
          <Chip v-for="user in data.users" :key="user" :label="user" />
        </template>
      </Column>
      <Column title="actions">
        <template #body="{ data }">
          <Button icon="pi pi-users" outlined @click="addToUser(data)" title="Assign role for users" />
          <Button icon="pi pi-pen-to-square" outlined @click="editRole(data)" title="Edit role" />
        </template>
      </Column>
    </DataTable>
  </ContentWrapper>
  <Dialog v-model="displayDialog" :style="{width: '50vw'}" :header="selectedRole?.name ? 'Edit Role' : 'Add Role'" :visible="displayDialog">
      <form @submit.prevent="saveRole">
          <div class="p-fluid">
              <div class="p-field">
                  <label for="name">Name</label>
                  <InputText id="name" v-model="selectedRole.name" />
              </div>
              <div class="p-field">
                  <label for="description">Description</label>
                  <InputText id="description" v-model="selectedRole.description" />
              </div>
              <div class="p-field">
                  <label for="permissions">Permissions</label>
                  <MultiSelect id="permissions" v-model="selectedRole.permissions" :options="permissions" option-label="description" option-value="name" />
              </div>
          </div>
      </form>
    <template #footer>
      <Button severity="success" label="OK" @click="saveRole" />
      <Button label="Cancel" outlined severity="secondary" @click="closeModal" />
    </template>
  </Dialog>
</template>