import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;

// Không set VITE_CLIENT_URL thì tự lấy origin đang chạy, khỏi phải sửa code mỗi lần đổi domain.
export const CLIENT_URL = import.meta.env.VITE_CLIENT_URL || window.location.origin;

export const PAYMENT_RETURN_URL = `${CLIENT_URL}/payment/success`;
export const PAYMENT_CANCEL_URL = `${CLIENT_URL}/payment/cancel`;

// Không set timeout thì axios chờ vô hạn: backend treo bao lâu, spinner quay bấy lâu.
// Để 90s vì backend đang ở Render gói Free — service ngủ sau 15 phút không có traffic,
// request đầu tiên đánh thức dậy mất tới ~60s. Hạ xuống 30s là cold start nào cũng hỏng.
const REQUEST_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 90000;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
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
