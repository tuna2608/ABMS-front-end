import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined
} from "@ant-design/icons";

import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import DepositManagement from './DepositManagement';
import AccountManagement from './AccountManagement';
import ApartmentManagement from './ApartmentManagement';
import PostManagement from './PostManagement';
import FinancialReports from './FinancialReports';
import SystemSettings from './SystemSettings';

const { Content, Header } = Layout;

const AdminHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

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
        return <AccountManagement />;
      case "pendingAccounts":
        return <AccountManagement />;
      case "apartments":
        return <ApartmentManagement />;
      case "postsList":
        return <PostManagement />;
      case "createPost":
        return <PostManagement />;
      case "reports":
        return <FinancialReports />;
      case "settings":
        return <SystemSettings />;
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
        <Header style={{ padding: 0, background: "#fff" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        </Header>
        
        <Content style={{ 
          margin: "24px 16px", 
          padding: 24, 
          background: "#fff", 
          borderRadius: 4, 
          minHeight: 280 
        }}>
          {renderActiveContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminHome;