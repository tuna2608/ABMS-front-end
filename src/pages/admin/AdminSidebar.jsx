import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  BellOutlined,
  SafetyOutlined,
  DollarOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const AdminSidebar = ({ collapsed, activeTab, setActiveTab, toggleCollapsed }) => {
  // Define menu items using the items prop format
  const items = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Bảng điều khiển",
      onClick: () => setActiveTab("dashboard")
    },
    {
      key: "deposits",
      icon: <SafetyOutlined />,
      label: "Quản lý đặt cọc",
      onClick: () => setActiveTab("deposits")
    },
    {
      key: "accounts",
      icon: <UserOutlined />,
      label: "Quản lý tài khoản",
      children: [
        {
          key: "accountsList",
          label: "Danh sách tài khoản",
          onClick: () => setActiveTab("accountsList")
        }
      ]
    },
    {
      key: "apartments",
      icon: <HomeOutlined />,
      label: "Quản lý căn hộ",
      onClick: () => setActiveTab("apartments")
    },
    {
      key: "posts",
      icon: <BellOutlined />,
      label: "Quản lý bài viết",
      children: [
        {
          key: "postsList",
          label: "Danh sách bài viết",
          onClick: () => setActiveTab("postsList")
        }
      ]
    },
    {
      key: "reports",
      icon: <DollarOutlined />,
      label: "Báo cáo tài chính",
      onClick: () => setActiveTab("reports")
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt hệ thống",
      onClick: () => setActiveTab("settings")
    }
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="light"
      width={250}
    >
      <div style={{ height: 64, padding: 16, textAlign: "center" }}>
        {/* Logo can go here */}
      </div>
      <Menu
        mode="inline"
        selectedKeys={[activeTab]}
        defaultOpenKeys={['accounts', 'posts']}
        items={items}
      />
    </Sider>
  );
};

export default AdminSidebar;