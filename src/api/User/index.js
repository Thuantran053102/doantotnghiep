import axiosClient from "../axiosClient";

const userApi = {
    uploadImg:(data)=>{
        const url = '/api/File/upload-image'
        return axiosClient.post(url, data, {
            headers:{
                'Content-Type': 'multipart/form-data',
                'uploadImage':'user'
            }
        })
    },
    login: (data) => {
        const url = '/api/user/user-login'
        return axiosClient.post(url, data)
    },
    register: (data) => {
        const url = '/api/user/user-register'
        return axiosClient.post(url, data)
    },
    getAll(params) {
        const url = '/api/user/get-users'
        // return axiosClient.get(url)
        return axiosClient.get(url, {params: params})
   },
    get: (id) => {
        const url = `/api/user/get-user/${id}`
        return axiosClient.get(url)
    }, 
    lock: (id) => {
        const url = `/api/user/lock-account/${id}`
        return axiosClient.patch(url)
    },
    unLock: (id) => {
        const url = `/api/user/unlock-account/${id}`
        return axiosClient.patch(url)
    },
    update: (data) => {
        const url = `/api/user/update-user/${data.userId}`
        delete data.userId
        return axiosClient.put(url, data)
    }, 
    resetPassword: (userId, newPassword) => {
        const url = `/api/user/reset-password/${userId}?newPassword=${newPassword}`
        // delete data.userId
        return axiosClient.patch(url)
    }, 
    getRoles: () => {
        const url = `/api/user/get-roles`
        return axiosClient.get(url)
    },
    delete: (id) => {
        const url = `/api/user/delete-account/${id}`
        return axiosClient.delete(url)
    }
}

export default userApi;