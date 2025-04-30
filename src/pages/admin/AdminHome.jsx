import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined
} from "@ant-design/icons";
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import DepositManagement from './DepositManagement';
import AccountManagement from './AccountManagement';
import ApartmentManagement from './ApartmentManagement';
import PostManagementView from '../admin/PostManagement';
import CoinManagement from './CoinManagement';
import ServicePostReview from './ServicePostReview';
import FinancialReports from './FinancialReports';
import AdminFormManagement from './FormManagement';

const { Content, Header } = Layout;

const AdminHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle default route redirection
  useEffect(() => {
    if (location.pathname === "/adminHome" || location.pathname === "/adminHome/") {
      navigate("/adminHome/dashboard");
    }
  }, [location.pathname, navigate]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "deposits":
        return <DepositManagement />;
      case "accountsList":
        return <AccountManagement view="list" />;
      case "pendingAccounts":
        return <AccountManagement view="pending" />;
      case "apartments":
        return <ApartmentManagement />;
      case "postsList":
        return <PostManagementView view="list" />;
  case "coin":
  return <CoinManagement />;
  case "service":
  return <ServicePostReview />;
      case "reports":
        return <FinancialReports />;
        case "form-management":
          return <AdminFormManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar 
        collapsed={collapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleCollapsed={toggleCollapsed}
      />

      <Layout>
        <Header
                  style={{
                    background: "#fff",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end", // Position elements at the end
                  }}
                >
                  <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={toggleCollapsed}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                      marginRight: 16, // Add margin from the right edge
                    }}
                  />
                </Header>
        <Content style={{ 
          margin: "24px 16px", 
          padding: 24, 
          background: "#fff", 
          borderRadius: 4, 
          minHeight: 280 
        }}>
          <Routes>
            <Route path="/" element={<Navigate to="/adminHome/dashboard" replace />} />
            <Route path="/dashboard" element={renderActiveContent()} />
            <Route path="/deposits" element={renderActiveContent()} />
            <Route path="/accounts/list" element={renderActiveContent()} />
            <Route path="/apartments" element={renderActiveContent()} />
            <Route path="/posts/list" element={renderActiveContent()} />
            <Route path="/coin" element={renderActiveContent()} />
            <Route path="/service" element={renderActiveContent()} />
            <Route path="/reports" element={renderActiveContent()} />
            <Route path="/form-management" element={renderActiveContent()} />
            <Route path="*" element={<Navigate to="/adminHome/dashboard" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminHome;