import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import queryString from "query-string";
const axiosClient = axios.create({
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  const tokenData = await AsyncStorage.getItem("auth");

  if (!tokenData) {
    return config;
  }

  const parsedData = JSON.parse(tokenData);
  const accessToken = parsedData.accessstoken;

  console.log("Token gửi đi:", accessToken);

  config.headers = {
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
    Accept: "application/json",
    ...config.headers,
  };
  config.data;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res.data && res.status === 200) {
      return res.data;
    }
    throw new Error("Error");
  },
  (err) => {
    console.log(`Error api ${JSON.stringify(err)}`);
    throw new Error(err.response);
  },
);
export default axiosClient;
