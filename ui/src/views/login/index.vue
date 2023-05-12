<script setup lang="ts">
import api from "@/api"
import router from "@/router"

const handleLogin = () => {
    api.authController.login('admin', 'admin')
        .then(() => {
            router.push('/dashboard')
        })
}
</script>
<template>
    <div class="login">
                  <form>
                      <h1>Login Form</h1>
                      <div>
                          <input type="text" class="form-control" placeholder="Username" required="">
                      </div>
                      <div>
                          <input type="password" class="form-control" placeholder="Password" required="">
                      </div>
                      <div>
                          <el-button class="btn-info" @click="handleLogin">Sign in</el-button>
                          <a class="btn btn-default submit" href="index.html">Log in</a>
                          <a class="reset_pass" href="#">Lost your password?</a>
                      </div>
                      <div class="clearfix"></div>
                  </form>
    </div>
</template>