import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  DollarOutlined,
  UserOutlined,
  SafetyOutlined,
  CreditCardOutlined,
  FormOutlined // Thêm icon cho quản lý đơn từ
} from "@ant-design/icons";

const { Sider } = Layout;

const SidebarMenu = ({ collapsed, setCollapsed, activeMenuItem, setActiveMenuItem }) => {
  const navigate = useNavigate();
  
  const handleMenuClick = (key) => {
    setActiveMenuItem(key);
    navigate(`/staffHome/${key}`);
  };

  const menuItems = [
    {
      key: "apartment-list",
      icon: <HomeOutlined />,
      label: "Danh sách căn hộ",
      onClick: () => handleMenuClick("apartment-list"),
    },
    {
      key: "account-management",
      icon: <UserOutlined />,
      label: "Quản lý tài khoản",
      onClick: () => handleMenuClick("account-management"),
    },
    {
      key: "deposit-management",
      icon: <SafetyOutlined />,
      label: "Quản lý đặt cọc",
      onClick: () => handleMenuClick("deposit-management"),
    },
    {
      key: "card-management",
      icon: <CreditCardOutlined />,
      label: "Quản lý thẻ",
      onClick: () => handleMenuClick("card-management"),
    },
    {
      key: "form-management",
      icon: <FormOutlined />,
      label: "Quản lý đơn từ",
      onClick: () => handleMenuClick("form-management"),
    },
    {
      key: "utility-management",
      icon: <DollarOutlined />,
      label: "Chi phí điện nước",
      onClick: () => handleMenuClick("utility-management"),
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
      />
    </Sider>
  );
};

export default SidebarMenu;