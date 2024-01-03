import axios from "axios"
import apiHelper from "./apiHelper"

export default {
    getStations(){
        return apiHelper.sibhAPIrequest('stations?fluviometricas=true')
    }
}

