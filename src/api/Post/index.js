import axiosClient from "../axiosClient";

const postApi = {
    add: (data) => {
        const url = '/Post/add-post'
        return axiosClient.post(url, data, {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb25ndGhhbmhzdG9yZW5vaWNodXllbmJhbmNhY3RoaWV0YmlkaWVudHUiLCJqdGkiOiJhYTRiYjhkNi1mNzZiLTQyMWUtODk2Zi1hZDc5MjgyODM4ZTEiLCJpYXQiOiIzLzEwLzIwMjIgMjowNzowOSBBTSIsIlVzZXJJZCI6IjIiLCJVc2VyTmFtZSI6ImFkbWluMSIsIkVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsIkF2YXRhciI6InN0cmluZyIsIlBob25lTnVtYmVyIjoiMDkwOTExMjIzMyIsImV4cCI6MTY0Njk2NDQyOSwiaXNzIjoiSXNzdWVyIiwiYXVkIjoiQXVkaWVuY2UifQ.vttWtH1iI39mO7wWsCwlMG5vQNfmwD_YPOw9-l5vHug'
            }
        })
    },
    uploadImg:(data)=>{
        const url = '/Post/upload-image'
        return axiosClient.post(url, data, {
            headers:{ 'Content-Type': 'multipart/form-data'}
        })
    }

}

export default postApi