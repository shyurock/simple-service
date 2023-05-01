import {Api, ContentType} from "./Api.ts";

class ServerApi extends Api<any> {
    authController = {
        /**
         * No description
         *
         * @tags auth-controller
         * @name login
         * @request POST:/api/login
         */
        login: (username: string, password: string) => {
            const form = new URLSearchParams
            form.append('username', username)
            form.append('password', password)
            return this.request<any, any>({
                path: "/api/login",
                method: "POST",
                body: form,
                type: ContentType.UrlEncoded,
            })
        },
        /**
         * No description
         *
         * @tags auth-controller
         * @name logout
         * @request POST:/api/logout
         */
        logOut: () =>
            this.request<any, any>({
                path: "/api/logout",
                method: "POST"
            })
    }
}

const api = new ServerApi({
    baseURL: '/'
})
export default api