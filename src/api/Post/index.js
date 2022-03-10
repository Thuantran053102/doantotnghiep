import axiosClient from "../axiosClient";

const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb25ndGhhbmhzdG9yZW5vaWNodXllbmJhbmNhY3RoaWV0YmlkaWVudHUiLCJqdGkiOiIyYzZlZTk5MC1mOTRlLTRiNmYtYTNmMi02NmM2YmZhODAyMzEiLCJpYXQiOiIzLzEwLzIwMjIgNzowNjoxNiBBTSIsIlVzZXJJZCI6IjIiLCJVc2VyTmFtZSI6ImFkbWluMSIsIkVtYWlsIjoic3RyaW5nIiwiQXZhdGFyIjoic3RyaW5nIiwiUGhvbmVOdW1iZXIiOiJzdHJpbmciLCJleHAiOjE2NDY5ODIzNzYsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.xkkJb2Uy13cRULx58V5sZC9l5fX7LdNWSchfV0D4jKs'
const postApi = {
    add: (data) => {
        const url = '/Post/add-post'
        return axiosClient.post(url, data, {
            headers: {
                'Authorization': token
            }
        })
    },
    uploadImg:(data)=>{
        const url = '/Post/upload-image'
        return axiosClient.post(url, data, {
            headers:{ 'Content-Type': 'multipart/form-data'}
        })
    },
    getAll(params) {
        const url = '/Post/get-posts'
        // return axiosClient.get(url)
        return axiosClient.get(url, {params: params},{
            headers: {
                'Authorization': token
            }
        })
    },
    get: (id) => {
        const url = `/user/get-user/${id}`
        return axiosClient.get(url)
    }, 
    delete:(id)=>{
        const url= `/Post/delete-post/${id}`
        return axiosClient.delete(url)
    }

}

export default postApi