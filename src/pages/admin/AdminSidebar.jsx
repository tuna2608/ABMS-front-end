import React, { useEffect, useMemo } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  BellOutlined,
  SafetyOutlined,
  DollarOutlined,
  DashboardOutlined,
  CreditCardOutlined,
  CustomerServiceOutlined
} from "@ant-design/icons";

const { Sider } = Layout;

const AdminSidebar = ({ collapsed, activeTab, setActiveTab, toggleCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use useMemo to create the pathToTab mapping - this ensures it's only created once
  const pathToTab = useMemo(() => ({
    'dashboard': 'dashboard',
    'deposits': 'deposits',
    'accounts': 'accountsList',
    'accounts/list': 'accountsList',
    'accounts/pending': 'pendingAccounts',
    'apartments': 'apartments',
    'posts': 'postsList',
    'posts/list': 'postsList',
    'posts/create': 'createPost',
    'reports': 'reports',
    'settings': 'settings',
    'payments': 'payments', // Added payment route mapping
    'coin': 'coin'
  }), []);
  
  // Effect to sync URL with active tab
  useEffect(() => {
    const path = location.pathname.replace('/adminHome/', '');
    const tab = pathToTab[path];
    
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.pathname, setActiveTab, pathToTab]);
  
  // Handle menu item click with navigation
  const handleMenuClick = (tabKey, urlPath) => {
    setActiveTab(tabKey);
    navigate(`/adminHome/${urlPath}`);
  };

  // Define menu items using the items prop format
  const items = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Bảng điều khiển",
      onClick: () => handleMenuClick("dashboard", "dashboard")
    },
    {
      key: "deposits",
      icon: <SafetyOutlined />,
      label: "Quản lý đặt cọc",
      onClick: () => handleMenuClick("deposits", "deposits")
    },
    {
      key: "accounts",
      icon: <UserOutlined />,
      label: "Quản lý tài khoản",
      children: [
        {
          key: "accountsList",
          label: "Danh sách tài khoản",
          onClick: () => handleMenuClick("accountsList", "accounts/list")
        },
      ]
    },
    {
      key: "apartments",
      icon: <HomeOutlined />,
      label: "Quản lý căn hộ",
      onClick: () => handleMenuClick("apartments", "apartments")
    },
    {
      key: "posts",
      icon: <BellOutlined />,
      label: "Quản lý bài viết",
      children: [
        {
          key: "postsList",
          label: "Danh sách bài viết",
          onClick: () => handleMenuClick("postsList", "posts/list")
        },
      ]
    },
    {
      key: "payments", // New payment management menu item
      icon: <CreditCardOutlined />,
      label: "Quản lý thanh toán",
      onClick: () => handleMenuClick("payments", "payments")
    },
    {
      key: "coin", // New payment management menu item
      icon: <CreditCardOutlined />,
      label: "Quản lý coin",
      onClick: () => handleMenuClick("coin", "coin")
    },
    {
      key: "service", // New payment management menu item
      icon: <CustomerServiceOutlined/>,
      label: "Quản lý bài viết dịch vụ",
      onClick: () => handleMenuClick("service", "service")
    },
    {
      key: "reports",
      icon: <DollarOutlined />,
      label: "Báo cáo tài chính",
      onClick: () => handleMenuClick("reports", "reports")
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt hệ thống",
      onClick: () => handleMenuClick("settings", "settings")
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