import axiosClient from "../axiosClient";

const postApi = {
    add: (data) => {
        const url = '/add-post'
        return axiosClient.get(url, data)
    },
    uploadImg:(date)=>{
        const url = '/api/Post/upload-image'
        return axiosClient.post(url, data)
    }

}

export default userApi;