import {createRouter, createWebHistory} from 'vue-router'
import Layout from '@/layout/index.vue'
import {useAuthStore} from '@/store/auth.ts'

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

const whiteList = ['/login', '/404', '403', '/register']
router.beforeEach((to) => {
    if (useAuthStore().token) {
        if (to.path === '/login') {
            return '/'
        } else {
            return true
        }
    } else {
        return whiteList.includes(to.path) ? true : '/login'
    }
})

export default router