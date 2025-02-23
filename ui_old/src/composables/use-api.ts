import { Api } from '@/api/api.ts'

let api: Api

export const useApi = () => {
    if (!api) {
        api = new Api({
            baseURL: '/',
        })
    }
    return api
}