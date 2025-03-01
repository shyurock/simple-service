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
                    path: '/admin/permissions',
                    name: 'permissions',
                    component: () => import('@/pages/admin/permissions.vue')
                }
            ]
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/pages/login.vue')
        },
        {
            path: '/auth/register',
            name: 'register', 
            component: () => import('@/pages/register.vue')
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

router.beforeEach(to => {
    const userStore = userUserStore()

    const publicRoutes = ['/auth/login', '/auth/register', '/landing']
    
    if (userStore.isLoggedIn && to.path === '/auth/login') {
        return { name: 'dashboard' }
    }

    if (!userStore.isLoggedIn && !publicRoutes.includes(to.path)) {
        return {
            name: 'login',
            query: { redirect: to.fullPath }
        }
    }
})

export default router
