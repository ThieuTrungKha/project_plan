import { appInfo } from "../constants/appInfo";
import axiosClient from "./axiosClient";

class ApiService {
  service = async (
    url?: string,
    data?: any,
    method?: "get" | "post" | "put" | "delete" | "patch",
    signal?: AbortSignal,
  ) => {
    const res = await axiosClient(`${appInfo.BASE_URL}${url}`, {
      method: method ?? "get",
      data,
      signal,
    });
    return res;
  };
}

const ClientService = new ApiService();

export default ClientService;
