import {createRouter, createWebHistory} from 'vue-router'
import AppLayout from '../layout/app-layout.vue'
import {userUserStore} from "../stores/user.ts";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/pages/dashboard.vue')
                }
            ]
        },
        {
            path: '/admin',
            component: AppLayout,
            redirect: '/admin/users',
            children: [
                {
                    path: '/admin/users',
                    name: 'users',
                    component: () => import('@/pages/admin/users.vue')
                },
                {
                    path: '/admin/roles',
                    name: 'roles',
                    component: () => import('@/pages/admin/roles.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/login.vue')
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/pages/landing.vue')
        },
        {
            path: "/:pathMatch(.*)*",
            name: "404",
            component: () => import("@/pages/404.vue"),
        },
    ]
})

router.beforeEach((to, from) => {
    const userStore = userUserStore()

    if (userStore.isLoggedIn && to.path === '/login') {
        return {
            name: 'dashboard'
        }
    }
    if (!userStore.isLoggedIn && to.path !== '/login') {
      return {
          name: 'login',
          query: { redirect: to.fullPath }
      }
    }
})

export default router
