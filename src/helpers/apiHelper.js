import axios from "axios"

export default {
    async sibhAPIrequest(url, params){
        return axios.request(`http://localhost:4000/request?url=${url}`,params)
    }
}