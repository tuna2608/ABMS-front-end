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
const { SubMenu } = Menu;

const AdminSidebar = ({ collapsed, activeTab, setActiveTab, toggleCollapsed }) => {
  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Bảng điều khiển"
    },
    {
      key: "deposits",
      icon: <SafetyOutlined />,
      label: "Quản lý đặt cọc"
    },
    {
      key: "accounts",
      icon: <UserOutlined />,
      label: "Quản lý tài khoản",
      children: [
        {
          key: "accountsList",
          label: "Danh sách tài khoản"
        }
      ]
    },
    {
      key: "apartments",
      icon: <HomeOutlined />,
      label: "Quản lý căn hộ"
    },
    {
      key: "posts",
      icon: <BellOutlined />,
      label: "Quản lý bài viết",
      children: [
        {
          key: "postsList",
          label: "Danh sách bài viết"
        }
      ]
    },
    {
      key: "reports",
      icon: <DollarOutlined />,
      label: "Báo cáo tài chính"
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt hệ thống"
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
      >
        {menuItems.map(item => {
          if (item.children) {
            return (
              <SubMenu
                key={item.key}
                icon={item.icon}
                title={item.label}
              >
                {item.children.map(child => (
                  <Menu.Item key={child.key} onClick={() => setActiveTab(child.key)}>
                    {child.icon && child.icon} {child.label}
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          }
          return (
            <Menu.Item key={item.key} icon={item.icon} onClick={() => setActiveTab(item.key)}>
              {item.label}
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default AdminSidebar;