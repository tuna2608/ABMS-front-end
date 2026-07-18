import React, { Fragment, Suspense } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import { routes } from "./routes";
import DefaultComponent from "./components/common/DefaultComponent/DefaultComponent";

function App() {
  return (
    <div>
      <Router>
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
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
