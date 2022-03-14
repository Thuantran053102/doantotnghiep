import axiosClient from "../axiosClient";

const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb25ndGhhbmhzdG9yZW5vaWNodXllbmJhbmNhY3RoaWV0YmlkaWVudHUiLCJqdGkiOiJhOWVjMTkyMS0yNDhiLTRlOTEtYTk1NS00NWYxMGRlMjNiZjciLCJpYXQiOiIzLzE0LzIwMjIgMjoxNDoyMCBBTSIsIlVzZXJJZCI6IjMiLCJVc2VyTmFtZSI6ImFkbWluMyIsIkVtYWlsIjoic3RyaW5nIiwiQXZhdGFyIjoic3RyaW5nIiwiUGhvbmVOdW1iZXIiOiJzdHJpbmciLCJleHAiOjE2NDczMTA0NjAsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.QJIS4SDpxkpV5j3vxLs4HLUtrI5qde5bNcbS-CokH5c'
const postApi = {
    add: (data) => {
        const url = '/Api/Post/add-post'
        return axiosClient.post(url, data, {
            headers: {
                'Authorization': token
            }
        })
    },
    uploadImg:(data)=>{
        const url = '/api/File/upload-image'
        return axiosClient.post(url, data, {
            headers:{
                'Content-Type': 'multipart/form-data',
                'uploadImage':'Post_Banner'
            }
        })
    },
    getAll(params) {
        const url = '/Api/Post/get-posts'
        // return axiosClient.get(url)
        return axiosClient.get(url, {params: params})
    },
    get: (id) => {
        const url = `/Api/Post/get-post/${id}`
        return axiosClient.get(url)
    },
    update: (data) => {
        const url = `/api/Post/update-post/${data.id}`
        return axiosClient.put(url, data)
    }, 
    delete:(id)=>{
        const url= `/Post/delete-post/${id}`
        return axiosClient.delete(url)
    }

}

export default postApi