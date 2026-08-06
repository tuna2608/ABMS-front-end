import React, { Fragment, Suspense, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { routes } from "./routes";
import DefaultComponent from "./components/common/DefaultComponent/DefaultComponent";
import ErrorBoundary from "./components/common/ErrorBoundary/ErrorBoundary";

/** Trang phải hiển thị được nội dung trong khoảng thời gian này, nếu không coi như lỗi. */
const PAGE_READY_TIMEOUT = 5000;
const PAGE_CHECK_INTERVAL = 200;

/** Phần tử chỉ báo đang tải — có mặt không đồng nghĩa với trang đã có nội dung. */
const LOADING_SELECTOR = ".ant-spin, .ant-skeleton";

/** Những thẻ được tính là "có nội dung để người dùng nhìn/thao tác". */
const CONTENT_SELECTOR = [
  "img",
  "button",
  "input",
  "textarea",
  "select",
  "table",
  "canvas",
  "video",
  "a[href]",
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "li",
  "td",
].join(",");

/**
 * Trang được coi là dùng được khi vùng nội dung có ít nhất một phần tử hiển thị
 * thật sự (khác chỉ báo loading).
 *
 * Chủ ý: một trang gọi API danh sách thất bại nhưng vẫn còn ô tìm kiếm, nút bấm
 * hay khung rỗng thì vẫn tính là bình thường — không đưa sang /error.
 */
function hasVisibleContent() {
  const root = document.querySelector("[data-app-content]");
  if (!root) return false;

  for (const node of root.querySelectorAll(CONTENT_SELECTOR)) {
    if (node.closest(LOADING_SELECTOR)) continue;
    const rect = node.getBoundingClientRect();
    if (rect.height > 0 && rect.width > 0) return true;
  }
  return false;
}

/**
 * Theo dõi mỗi lần đổi route: nếu sau PAGE_READY_TIMEOUT trang vẫn trắng
 * (không render được gì, hoặc kẹt ở trạng thái loading) thì chuyển sang /error.
 */
function RouteHealthWatcher() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/error") return undefined;

    const startedAt = Date.now();

    const timer = setInterval(() => {
      if (hasVisibleContent()) {
        clearInterval(timer);
        return;
      }
      if (Date.now() - startedAt >= PAGE_READY_TIMEOUT) {
        clearInterval(timer);
        navigate("/error", { replace: true });
      }
    }, PAGE_CHECK_INTERVAL);

    return () => clearInterval(timer);
  }, [navigate, location.pathname]);

  return null;
}

function App() {
  return (
    <div>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ErrorBoundary>
          <RouteHealthWatcher />
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "100vh",
                }}
              >
                <Spin size="large" />
              </div>
            }
          >
            <Routes>
              {routes.map((route) => {
                const Page = route.page;
                const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <Layout>
                        {/* Mốc để RouteHealthWatcher biết đâu là vùng nội dung của trang */}
                        <div data-app-content>
                          <Page />
                        </div>
                      </Layout>
                    }
                  />
                );
              })}
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;
