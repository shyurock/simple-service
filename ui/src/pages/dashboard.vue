<script setup lang="ts">
import {ref} from 'vue';

import {useToast} from 'primevue/usetoast';

const toast = useToast();

const users = ref([
  {
    id: 1,
    name: 'Ivan Petrenko',
    email: 'ivan@example.com',
    role: 'Administrator',
    createdAt: '2023-01-15'
  },
  {
    id: 2,
    name: 'Maria Kovalenko',
    email: 'maria@example.com',
    role: 'User',
    createdAt: '2023-02-20'
  }
]);

const devices = ref([
  {
    name: 'Temperature Sensor 1',
    type: 'Temperature',
    status: 'online',
    children: [
      {
        name: 'Subsystem 1',
        type: 'Module',
        status: 'online'
      }
    ]
  },
  {
    name: 'Humidity Sensor 1',
    type: 'Humidity',
    status: 'offline'
  }
]);
const editDialog = ref(false);
const editingUser = ref({
  id: null,
  name: '',
  email: '',
  role: ''
});

const editUser = (user: any) => {
  editDialog.value = true;
  editingUser.value = user;
}

const hideDialog = () => {
  editDialog.value = false;
}

const saveUser = () => {

  console.log('saveUser');
}

const removeUser = (user: any) => {
  console.log('removeUser');
}


// const deviceProperties = ref([
//     {
//         field: 'lastUpdate',
//         header: 'Last Update',
//         type: 'date'
//     },
//     {
//         field: 'isActive',
//         header: 'Active',
//         type: 'boolean'
//     }
// ]);

</script>
<template>
  <Dialog v-model:visible="editDialog" modal header="Edit User" :style="{width:'450px'}" class="p-fluid">
    <div class="field mb-4">
      <label for="name" class="mb-2">Name</label>
      <InputText id="name" v-model="editingUser.name" required autofocus class="w-full"/>
    </div>

    <div class="field mb-4">
      <label for="email" class="mb-2">Email</label>
      <InputText id="email" v-model="editingUser.email" required class="w-full"/>
    </div>

    <div class="field mb-4">
      <label for="role" class="mb-2">Role</label>
      <Dropdown id="role" v-model="editingUser.role" :options="['Administrator','User']" placeholder="Select a role"
                class="w-full"/>
    </div>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" outlined @click="hideDialog" class="mr-2"/>
      <Button label="Save" icon="pi pi-check" @click="saveUser"/>
    </template>
  </Dialog>
  <div className="card">
    <div class="font-semibold text-xl mb-4">Empty Page</div>
    <p>Use this page to start from scratch and place your custom content.</p>
  </div>
  <div class="card mt-4">
    <DataTable :value="users" :paginator="true" :rows="10"
               :rowsPerPageOptions="[5,10,20]" responsiveLayout="scroll">
      <Column field="id" header="ID" sortable></Column>
      <Column field="name" header="Name" sortable></Column>
      <Column field="email" header="Email" sortable></Column>
      <Column field="role" header="Role" sortable></Column>
      <Column field="createdAt" header="Creation Date" sortable>
        <template #body="slotProps">
          {{ new Date(slotProps.data.createdAt).toLocaleDateString('en-US') }}
        </template>
      </Column>
      <Column header="Actions" :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" rounded outlined class="mr-2"
                  @click="editUser(slotProps.data)"/>
          <Button icon="pi pi-trash" rounded outlined severity="danger"
                  @click="removeUser(slotProps.data)"/>
        </template>
      </Column>
    </DataTable>
  </div>
  <!-- <div class="card mt-4">
      <TreeTable :value="devices" responsiveLayout="scroll">
          <Column field="name" header="Device Name" expander></Column>
          <Column field="type" header="Type"></Column>
          <Column field="status" header="Status">
              <template #body="slotProps">
                  <Tag :value="slotProps.data.status"
                       :severity="slotProps.data.status === 'online' ? 'success' : 'danger'" />
              </template>
          </Column> -->
  <!-- <Column v-for="prop in deviceProperties"
          :key="prop.field"
          :field="prop.field"
          :header="prop.header">
      <template #body="slotProps" v-if="prop.type === 'date'">
          {{ new Date(slotProps.data[prop.field]).toLocaleDateString('en-US') }}
      </template>
      <template #body="slotProps" v-else-if="prop.type === 'boolean'">
          <i :class="slotProps.data[prop.field] ? 'pi pi-check text-green-500' : 'pi pi-times text-red-500'"></i>
      </template>
      <template #body="slotProps" v-else>
          {{ slotProps.data[prop.field] }}
      </template>
  </Column> -->
  <!-- <Column header="Actions" :exportable="false" style="min-width:8rem">
      <template #body="slotProps">
          <Button icon="pi pi-pencil" rounded outlined class="mr-2"
                  @click="editDevice(slotProps.data)" />
          <Button icon="pi pi-trash" rounded outlined severity="danger"
                  @click="removeDevice(slotProps.data)" />
      </template>
  </Column> -->
  <!-- </TreeTable>
</div> -->
</template>