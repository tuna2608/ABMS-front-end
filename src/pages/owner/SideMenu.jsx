import React from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  FormOutlined,
  FileProtectOutlined,
  WalletOutlined,
  FileAddOutlined,
  MessageOutlined,
  CreditCardOutlined
} from "@ant-design/icons";

const SideMenu = ({ setCurrentView }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the current view from the URL
  const getCurrentViewFromPath = () => {
    const path = location.pathname.split('/').pop();
    // Map URL paths to view keys
    const pathToView = {
      'list': 'list',
      'post-management': 'post',
      'contract-management': 'contract',
      'payment-management': 'payment',
      'bill-management': 'bill-management',
      'document-upload': 'upload',
      'messages': 'chatpage'
    };
    
    return pathToView[path] || 'list';
  };
  
  // Handle menu item click
  const handleMenuClick = (viewKey, urlPath) => {
    setCurrentView(viewKey);
    navigate(`/ownerHome/${urlPath}`);
  };

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Danh sách căn hộ",
      onClick: () => handleMenuClick("list", "list"),
    },
    {
      key: "2",
      icon: <FormOutlined />,
      label: "Quản lý bài viết",
      onClick: () => handleMenuClick("post", "post-management"),
    },
    {
      key: "3",
      icon: <FileProtectOutlined />,
      label: "Quản lý hợp đồng",
      onClick: () => handleMenuClick("contract", "contract-management"),
    },
    {
      key: "4",
      icon: <WalletOutlined />,
      label: "Quản lý thanh toán",
      onClick: () => handleMenuClick("payment", "payment-management"),
    },
    {
      key: "5",
      icon: <FileAddOutlined />,
      label: "Quản lý hóa đơn",
      onClick: () => handleMenuClick("bill-management", "bill-management"),
    },
    {
      key: "5",
      icon: <CreditCardOutlined />,
      label: "Danh sách chuyển Coin",
      onClick: () => handleMenuClick("coin-request", "coin-request"),
    },
    {
      key: "7",
      icon: <MessageOutlined />,
      label: "Tin nhắn",
      onClick: () => handleMenuClick("chatpage", "messages"),
    },
  ];
  
  // Get current menu key based on current view
  const getCurrentKey = () => {
    const viewToKey = {
      'list': '1',
      'post': '2',
      'contract': '3',
      'payment': '4',
      'bill-management': '5',
      'upload': '6',
      'chatpage': '7'
    };
    
    return viewToKey[getCurrentViewFromPath()] || '1';
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      selectedKeys={[getCurrentKey()]}
      items={menuItems}
    />
  );
};

export default SideMenu;