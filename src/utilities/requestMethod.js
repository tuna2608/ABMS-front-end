import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;

// Không set VITE_CLIENT_URL thì tự lấy origin đang chạy, khỏi phải sửa code mỗi lần đổi domain.
export const CLIENT_URL = import.meta.env.VITE_CLIENT_URL || window.location.origin;

export const PAYMENT_RETURN_URL = `${CLIENT_URL}/payment/success`;
export const PAYMENT_CANCEL_URL = `${CLIENT_URL}/payment/cancel`;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const currentUser = user && JSON.parse(user).currentUser;
    const TOKEN = currentUser?.accessToken;
    if (TOKEN) {
      config.headers.token = `Bearer ${TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
