import router from "./index.ts"
import {basicStore} from "../store/basic.ts"

const whiteList = ['/login', '/404', '403', '/register']
router.beforeEach((to) => {
    if (basicStore().token) {
        if (to.path === '/login') {
            return '/'
        } else {
            return true
        }
    } else {
        return whiteList.includes(to.path) ? true : '/login'
    }
})