import React, { Fragment } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/common/DefaultComponent/DefaultComponent';

function App() {
  
  // Testing
  // const user = useSelector((state) => state.user.currentUser);

  // const isAdmin = user && user.isAdmin;

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.page} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
