import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // sockjs-client tham chiếu tới biến `global` của Node, không tồn tại trên
  // trình duyệt → map về `globalThis` để STOMP/SockJS chạy được.
  define: {
    global: "globalThis",
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 3000,
  },
});
