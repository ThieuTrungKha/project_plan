import { appInfo } from "../constants/appInfo";
import axiosClient from "./axiosClient";

class planApi {
  planService = async (
    url?: string,
    data?: any,
    method?: "get" | "post" | "put" | "delete",
  ) => {
    return await axiosClient(`${appInfo.BASE_URL}/plan${url}`, {
      method: method ?? "get",
      data,
    });
  };
}

const PlanApiService = new planApi();

export default PlanApiService;
