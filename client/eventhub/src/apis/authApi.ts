import { appInfo } from "../constants/appInfo"
import axiosClient from "./axiosClient"
class AuthApi {
    HandleAuthentication = ( async (
        url?: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete' ,

    ) => {
        return await axiosClient(`${appInfo.BASE_URL}/auth${url}`, {
            method: method ?? 'get',
            data
        })
    }
)
}

const authenticationApi = new AuthApi()
export default
authenticationApi