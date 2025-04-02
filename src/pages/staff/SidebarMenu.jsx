import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  DollarOutlined,
  UserOutlined,
  SafetyOutlined,
  CreditCardOutlined,
  FileAddOutlined  // Add bill management icon
} from "@ant-design/icons";

const { Sider } = Layout;

const SidebarMenu = ({ collapsed, setCollapsed, activeMenuItem, setActiveMenuItem }) => {
  const menuItems = [
    {
      key: "apartment-list",
      icon: <HomeOutlined />,
      label: "Danh sách căn hộ",
      onClick: () => setActiveMenuItem("apartment-list"),
    },
    {
      key: "account-management",
      icon: <UserOutlined />,
      label: "Quản lý tài khoản",
      onClick: () => setActiveMenuItem("account-management"),
    },
    {
      key: "deposit-management",
      icon: <SafetyOutlined />,
      label: "Quản lý đặt cọc",
      onClick: () => setActiveMenuItem("deposit-management"),
    },
    {
      key: "card-management",
      icon: <CreditCardOutlined />,
      label: "Quản lý thẻ",
      onClick: () => setActiveMenuItem("card-management"),
    },
    {
      key: "bill-management",  
      icon: <FileAddOutlined />,
      label: "Quản lý hóa đơn",
      onClick: () => setActiveMenuItem("bill-management"),
    },
    {
      key: "utility-management",
      icon: <DollarOutlined />,
      label: "Chi phí điện nước",
      onClick: () => setActiveMenuItem("utility-management"),
    },
  ];

  return (
    <Sider
      width={250}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      trigger={null}
      theme="light"
    >
      <div style={{ height: 64, padding: 16, textAlign: "center" }}>

      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['apartment-list']}
        items={menuItems}
        selectedKeys={[activeMenuItem]}
        onClick={({ key }) => setActiveMenuItem(key)}
      />
    </Sider>
  );
};

export default SidebarMenu;