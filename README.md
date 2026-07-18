# apartment-manage (client)

Client quản lý chung cư — React SPA, build bằng [Vite](https://vite.dev/).

## Yêu cầu môi trường

- **Node.js 24.x** (xem `.nvmrc` → `nvm use`)
- **npm >= 10**

## Biến môi trường

Sao chép `.env.example` thành `.env` rồi điền giá trị. Vite chỉ expose các biến
có tiền tố `VITE_` ra phía client (truy cập qua `import.meta.env.VITE_*`):

| Biến | Mô tả |
| --- | --- |
| `VITE_API_URL` | Base URL của backend |
| `VITE_CLIENT_URL` | URL của chính client |
| `VITE_GEMINI_API_KEY` | API key Gemini cho tính năng tạo nội dung AI |

## Scripts

Trong thư mục dự án, bạn có thể chạy:

### `npm run dev` (hoặc `npm start`)

Chạy dev server tại [http://localhost:3000](http://localhost:3000) với HMR.

### `npm run build`

Build bản production vào thư mục `build/` (đã tối ưu, minify, hash filename).

### `npm run preview`

Chạy thử bản production đã build tại local.

### `npm run lint` / `npm run lint:fix`

Chạy ESLint (flat config, `eslint.config.js`).

### `npm run format` / `npm run format:check`

Chạy Prettier trên `src/`.

### `npm run fix`

Chạy `lint:fix` rồi `format`.

## Stack

- React 18 + React Router v6
- Redux Toolkit + redux-persist, React Query (`@tanstack/react-query`)
- UI: Ant Design (+ MUI icons), styled-components, sass
- HTTP: axios · Realtime: STOMP + SockJS
- Build tool: Vite 8 + `@vitejs/plugin-react`
