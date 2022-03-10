import axiosClient from "../axiosClient";

const userApi = {
    login: (data) => {
        const url = '/user/user-login'
        return axiosClient.post(url, data)
    },
    register: (data) => {
        const url = '/user/user-register'
        return axiosClient.post(url, data)
    },
    getAll(params) {
        const url = '/user/get-users'
        // return axiosClient.get(url)
        return axiosClient.get(url, {params: params})
   },
    get: (id) => {
        const url = `/user/get-user/${id}`
        return axiosClient.get(url)
    }, 
    lock: (id) => {
        const url = `/user/lock-account/${id}`
        return axiosClient.patch(url)
    },
    unLock: (id) => {
        const url = `/user/unlock-account/${id}`
        return axiosClient.patch(url)
    },
    update: (data) => {
        const url = `/user/update-user/${data.id}`
        return axiosClient.put(url, data)
    }, 
    resetPassword: (data) => {
        const url = `/user/reset-password/${data.id}`
        return axiosClient.patch(url)
    }, 
    getRoles: () => {
        const url = `/user/get-roles`
        return axiosClient.get(url)
    }
}

export default userApi;