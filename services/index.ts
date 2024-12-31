import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const user = await AsyncStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    if (parsedUser?.token) {
      config.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      AsyncStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
