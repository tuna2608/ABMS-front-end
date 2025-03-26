import React, { useState } from 'react';
import { Layout, Button, Card, Space } from 'antd';
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined,
  UserAddOutlined,
  UserOutlined,
  HomeOutlined,
  BellOutlined,
  FileAddOutlined,
  DollarOutlined,
  SettingOutlined
} from "@ant-design/icons";

import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import DepositManagement from './DepositManagement';
// Import các component khác ở đây

const { Content, Header } = Layout;

const AdminHome = () => {
  // State management
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Toggle sidebar collapse
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Render active content based on selected tab
  const renderActiveContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "deposits":
        return <DepositManagement />;
      case "accountsList":
        return (
          <Card 
            title={
              <Space>
                <UserOutlined /> 
                <span>Danh sách tài khoản</span>
              </Space>
            }
          >
            <p>Nội dung quản lý tài khoản sẽ được cập nhật sau.</p>
          </Card>
        );
      case "pendingAccounts":
        return (
          <Card 
            title={
              <Space>
                <UserAddOutlined /> 
                <span>Duyệt tài khoản</span>
              </Space>
            }
          >
            <p>Nội dung duyệt tài khoản sẽ được cập nhật sau.</p>
          </Card>
        );
      case "apartments":
        return <ApartmentsManagement />;
      case "postsList":
        return <PostsList />;
      case "createPost":
        return <CreatePost />;
      case "reports":
        return <FinancialReports />;
      case "settings":
        return <SystemSettings />;
      default:
        return <AdminDashboard />;
    }
  };
// Placeholder components to be developed later
const ApartmentsManagement = () => (
  <Card 
    title={
      <Space>
        <HomeOutlined /> 
        <span>Quản lý căn hộ</span>
      </Space>
    } 
    extra={
      <Button type="primary">
        Thêm căn hộ mới
      </Button>
    }
  >
    <p>Nội dung quản lý căn hộ sẽ được cập nhật.</p>
  </Card>
);

const PostsList = () => (
  <Card 
    title={
      <Space>
        <BellOutlined /> 
        <span>Danh sách bài viết</span>
      </Space>
    }
  >
    <p>Danh sách bài viết sẽ được cập nhật.</p>
  </Card>
);

const CreatePost = () => (
  <Card 
    title={
      <Space>
        <FileAddOutlined /> 
        <span>Tạo bài viết mới</span>
      </Space>
    }
  >
    <p>Chức năng tạo bài viết sẽ được cập nhật.</p>
  </Card>
);

const FinancialReports = () => (
  <Card 
    title={
      <Space>
        <DollarOutlined /> 
        <span>Báo cáo tài chính</span>
      </Space>
    }
  >
    <p>Báo cáo tài chính sẽ được cập nhật.</p>
  </Card>
);

const SystemSettings = () => (
  <Card 
    title={
      <Space>
        <SettingOutlined /> 
        <span>Cài đặt hệ thống</span>
      </Space>
    }
  >
    <p>Cài đặt hệ thống sẽ được cập nhật.</p>
  </Card>
);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <AdminSidebar 
        collapsed={collapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleCollapsed={toggleCollapsed}
      />

      <Layout>
        {/* Header with sidebar toggle */}
        <Header style={{ padding: 0, background: "#fff" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        </Header>
        
        {/* Main Content Area */}
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

