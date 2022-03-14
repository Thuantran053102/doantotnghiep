import axiosClient from "../axiosClient";

const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb25ndGhhbmhzdG9yZW5vaWNodXllbmJhbmNhY3RoaWV0YmlkaWVudHUiLCJqdGkiOiIwMjgyOWY0Ny1iMjNkLTQ2ODktYTY3OC0yNjczNWM0NmYxMDUiLCJpYXQiOiIzLzE0LzIwMjIgNzoxNjo0MyBBTSIsIlVzZXJJZCI6IjU4IiwiVXNlck5hbWUiOiJhZG1pbjEiLCJFbWFpbCI6InN0cmluZyIsIkF2YXRhciI6InN0cmluZyIsIlBob25lTnVtYmVyIjoic3RyaW5nIiwiZXhwIjoxNjQ3MzI4NjAzLCJpc3MiOiJJc3N1ZXIiLCJhdWQiOiJBdWRpZW5jZSJ9.xnqZQ8AQoqEf1pBKnb5igZM1g9oiS7LJp7V_GzMUT-U'
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
        console.log('fect:'+ data.content)
        const url = `/api/Post/update-post/${data.postId}`
        delete data.postId
        return axiosClient.put(url, data ,{
            headers: {
                'Authorization': token
            }
        })
    }, 
    delete:(id)=>{
        const url= `/Post/delete-post/${id}`
        return axiosClient.delete(url)
    }

}

export default postApi