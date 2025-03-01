<script setup lang="ts">
import {ref} from 'vue'
import {userUserStore} from '@/stores/user.ts'
import {useRoute, useRouter} from 'vue-router'

const router = useRouter()
const route = useRoute()
const { login } = userUserStore()
const email = ref('')
const password = ref('')

const loginHandle = () => {
  login(email.value, password.value)
    .then(() => {
      const toast = useToast()
      toast.add({ severity: 'success', summary: 'Success', detail: 'Logged in successfully', life: 3000 })
    })
    .then(() => router.push(route.query.redirect ?? '/dashboard'))
}

</script>

<template>
  <div
      class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
    <div class="flex flex-col items-center justify-center">
      <div
          style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
          <div class="text-center mb-8">
            <img class="w-[150px] m-auto mb-10" src="@/assets/images/logo.png" alt="logo">
            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to simple-service!</div>
            <span class="text-muted-color font-medium">Create a new account</span>
          </div>

          <div>
            <label for="name" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Name</label>
            <InputText id="name" type="text" placeholder="Enter your name" class="w-full md:w-[30rem] mb-8"
                       v-model="name"/>

            <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
            <InputText id="email" type="email" placeholder="Enter your email address" class="w-full md:w-[30rem] mb-8"
                       v-model="email"/>

            <label for="password"
                   class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
            <Password id="password" v-model="password" placeholder="Enter password" :toggleMask="true" class="mb-4"
                      fluid :feedback="true"></Password>

            <label for="confirmPassword" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Confirm
              Password</label>
            <Password id="confirmPassword" v-model="confirmPassword" placeholder="Confirm password" :toggleMask="true"
                      class="mb-8" fluid :feedback="false"></Password>

            <div class="flex items-center justify-between mt-2 mb-8">
              <div class="flex items-center">
                <Checkbox v-model="agreeToTerms" id="agreeToTerms" binary class="mr-2"></Checkbox>
                <label for="agreeToTerms" class="text-sm">I agree to the terms of use</label>
              </div>
            </div>
            <Button label="Register" class="w-full p-3 mb-4" @click="registerHandle"></Button>
            <div class="text-center">
              <span class="text-surface-600 dark:text-surface-400">Already have an account?</span>
              <router-link to="/auth/login" class="font-medium ml-2 text-primary hover:underline">Login</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
