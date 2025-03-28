import { appInfo } from "../constants/appInfo";
import axiosClient from "./axiosClient";

class ApiService {
  service = async (
    url?: string,
    data?: any,
    method?: "get" | "post" | "put" | "delete" | "patch",
    signal?: AbortSignal,
  ) => {
    console.log("service has been called", url);
    const res = await axiosClient(`${appInfo.BASE_URL}${url}`, {
      method: method ?? "get",
      data,
      signal,
    });
    return res;
    console.log("check");
  };
}

const ClientService = new ApiService();

export default ClientService;
