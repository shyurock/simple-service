import {createRouter, createWebHistory} from "vue-router";
import Layout from '@/layout/index.vue'

const constantRoutes = [
    { path: '/login', component: () => import('@/views/login/index.vue') },
    { path: '/404', component: () => import('@/views/404.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/404' },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index.vue')
        }]
    }
]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({ top: 0 }),
    routes: constantRoutes
})
export default router