import {createRouter, createWebHistory} from 'vue-router'
import AppLayout from '../layout/app-layout.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'landing',
            component: () => import('../pages/landing.vue')
        },
        {
            path: '/pages',
            component: AppLayout,
            redirect: '/pages/dashboard',
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('../pages/dashboard.vue')
                }
            ]
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('../pages/login.vue')
        }
    ]
})

export default router
