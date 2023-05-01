import {createRouter, createWebHistory} from "vue-router";

const constantRoutes = [
    { path: '/login', component: () => import('../views/login/index.vue') },
    { path: '/404', component: () => import('../views/404.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/404' }
]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({ top: 0 }),
    routes: constantRoutes
})
export default router