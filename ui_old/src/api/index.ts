import {Api, ContentType, RequestParams} from "./api.ts";

class ServerApi extends Api<any> {
    authController = {
        /**
         * No description
         *
         * @tags auth-controller
         * @name login
         * @request POST:/api/login
         */
        login: (username: string, password: string, params: RequestParams = {}) => {
            const form = new URLSearchParams
            form.append('username', username)
            form.append('password', password)
            return this.request<any, any>({
                path: "/api/login",
                method: "POST",
                body: form,
                type: ContentType.UrlEncoded,
                ...params
            })
        },
        /**
         * No description
         *
         * @tags auth-controller
         * @name logout
         * @request POST:/api/logout
         */
        logOut: (params: RequestParams = {}) =>
            this.request<any, any>({
                path: "/api/logout",
                method: "POST",
                ...params
            })
    }
}

const api = new ServerApi({
    baseURL: '/'
})
export default api